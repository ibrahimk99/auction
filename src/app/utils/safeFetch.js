export async function safeFetch(
  url,
  dispatch = null,
  options = {},
  successId = null,
  signal = null
) {
  try {
    const response = await fetch(url, { ...options, signal });
    const result = await response.json();

    if (response.ok && result.success) {
      if (dispatch && result.message) {
        dispatch({
          type: "toast/showToast",
          payload: {
            id: successId || "success",
            message: result.message,
            type: "success",
          },
        });
      }
      return result.data;
    }

    throw new Error(result.message || "Request failed");
  } catch (error) {
    if (error.name === "AbortError") return null;
    if (dispatch) {
      dispatch({
        type: "toast/showToast",
        payload: {
          id: "network-error",
          message: "Network Error! Please try again later.",
          type: "warning",
        },
      });
    }

    console.error("safeFetch error:", error);
    return null;
  }
}
