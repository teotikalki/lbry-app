import * as types from "constants/action_types";
import lbryuri from "lbryuri";
import lighthouse from "lighthouse";
import { doResolveUri } from "actions/content";
import { doNavigate } from "actions/navigation";
import { selectCurrentPage } from "selectors/navigation";
import batchActions from "util/batchActions";
import http from "http";

export function doSearch1(query) {
  return function(dispatch, getState) {
    const state = getState();
    const page = selectCurrentPage(state);

    if (!query) {
      return dispatch({
        type: types.SEARCH_CANCELLED,
      });
    }

    dispatch({
      type: types.SEARCH_STARTED,
      data: { query },
    });

    if (page != "search") {
      dispatch(doNavigate("search", { query: query }));
    } else {
      lighthouse.search(query).then(results => {
        console.log(results);
        const actions = [];

        results.forEach(result => {
          const uri = lbryuri.build({
            channelName: result.channel_name,
            contentName: result.name,
            claimId: result.channel_id || result.claim_id,
          });
          actions.push(doResolveUri(uri));
        });

        actions.push({
          type: types.SEARCH_COMPLETED,
          data: {
            query,
            results,
          },
        });

        dispatch(batchActions(...actions));
      });
      // }
    }
  };
}

export function doSearch(query) {
  return function(dispatch, getState) {
    const state = getState();
    const page = selectCurrentPage(state);

    if (!query) {
      return dispatch({
        type: types.SEARCH_CANCELLED,
      });
    }

    dispatch({
      type: types.SEARCH_STARTED,
      data: { query },
    });

    const req = http.get(
      {
        headers: {
          "Content-Type": "text/html",
        },
        host: "34.232.69.233",
        port: 8181,
        path: `/api/lighthouse/search?s=${query}`,
      },
      response => {
        if (response.statusCode === 200) {
          response.setEncoding("utf8");
          let output = "";

          response.on("data", chunk => {
            output += chunk;
          });

          response.on("end", () => {
            let jsonOut = JSON.parse(output);
            let results = JSON.parse(output).claim[0].options;
            console.log(results);

            const actions = [];

            results.forEach(result => {
              const uri = lbryuri.build({
                channelName: result._source.channel_name,
                contentName: result._source.name,
                claimId: result._source.claimId,
              });
              console.log(uri);
              actions.push(doResolveUri(uri));
            });

            actions.push({
              type: types.SEARCH_COMPLETED,
              data: {
                query,
                results,
              },
            });

            dispatch(batchActions(...actions));
          });
        } else {
          errorHandler(new Error("Search failed."));
        }
      }
    );

    const errorHandler = err => {
      // dispatch({
      //   type: types.SEARCH_FAILED,
      //   data: { req },
      // });
      console.log("Error", req, err);
    };

    req.setTimeout(30000, function() {
      req.abort();
    });

    req.on("error", errorHandler);
  };
}
