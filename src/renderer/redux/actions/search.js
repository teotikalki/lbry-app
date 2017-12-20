import * as actions from "constants/action_types";
import lbryuri from "lbryuri";
import { doResolveUri } from "redux/actions/content";
import { doNavigate } from "redux/actions/navigation";
import { selectCurrentPage } from "redux/selectors/navigation";
import batchActions from "util/batchActions";

const handleResponse = response => {
  return response.status === 200
    ? Promise.resolve(response.json())
    : Promise.reject(new Error(response.statusText));
};

export function doSearch(rawQuery) {
  return function(dispatch, getState) {
    const state = getState();
    const page = selectCurrentPage(state);

    const query = rawQuery.replace(/^lbry:\/\//i, "");

    if (!query) {
      return dispatch({
        type: actions.SEARCH_CANCELLED,
      });
    }

    dispatch({
      type: actions.SEARCH_STARTED,
      data: { query },
    });

    if (page != "search") {
      dispatch(doNavigate("search", { query: query }));
    } else {
      fetch("https://lighthouse.lbry.io/search?s=" + query)
        .then(handleResponse)
        .then(data => {
          let uris = [];
          let actions = [];

          data.forEach(result => {
            const uri = lbryuri.build({
              name: result.name,
              claimId: result.claimId,
            });
            actions.push(doResolveUri(uri));
            uris.push(uri);
          });

          actions.push({
            type: actions.SEARCH_COMPLETED,
            data: {
              query,
              uris,
            },
          });
          dispatch(batchActions(...actions));
        })
        .catch(err => {
          dispatch({
            type: actions.SEARCH_CANCELLED,
          });
        });
    }
  };
}

export const updateSearchQuery = searchQuery => {
  return {
    type: actions.UPDATE_SEARCH_QUERY,
    data: { searchQuery },
  };
};

export const getSearchSuggestions = value => dispatch => {
  dispatch({ type: actions.GET_SEARCH_SUGGESTIONS_START });

  // need to handle spaces?
  return fetch("https://lighthouse.lbry.io/autocomplete?s=" + value)
    .then(handleResponse)
    .then(suggestions => {
      suggestions = suggestions.slice(0, 5).map(suggestion => {
        // const hasSpaces = suggestion.indexOf(" ") !== -1;
        // const value = hasSpaces ? suggestion : `lbry://${suggestion}`;

        return { label: suggestion, value: suggestion };
      });

      // check if we should add a lbry uri as the first search result
      try {
        const uri = lbryuri.normalize(value);
        suggestions.unshift({ label: uri, value: uri });
      } catch (e) {
        if (value) {
          suggestions.unshift({ label: `Search for "${value}"`, value });
        }
      }

      return dispatch({
        type: actions.GET_SEARCH_SUGGESTIONS_SUCCESS,
        data: suggestions,
      });
    })
    .catch(err =>
      dispatch({
        type: actions.GET_SEARCH_SUGGESTIONS_FAIL,
        data: err,
      })
    );
};
