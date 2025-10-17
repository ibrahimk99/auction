export async function safeFetch(
  url,
  dispatch,
  options = {},
  successId = "fetch-success"
) {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(url, { ...options, signal });
    const result = await response.json();

    if (response.ok && result.success) {
      if (result.message) {
        dispatch({
          type: "toast/showToast",
          payload: {
            id: successId,
            message: result.message,
            type: "success",
          },
        });
      }
      return result.data;
    } else {
      throw new Error(result.message || "Request failed");
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    dispatch({
      type: "toast/showToast",
      payload: {
        id: "network-error",
        message: "Network Error! Please try again later.",
        type: "warning",
      },
    });
    console.error("Fetch error:", error);
  }

  return null;
}
