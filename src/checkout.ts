export async function checkout() {
  try {
    // Updated product UID to 'tmequinoxpro' per request
    const res = await fetch("/api/checkout/tmequinoxpro", { method: "POST" });

    // Check if response is OK
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Payment API Error:", {
        status: res.status,
        statusText: res.statusText,
        error: errorText,
      });
      alert(`Payment failed: ${res.status} - ${res.statusText}`);
      return;
    }

    // Check if response is JSON
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await res.text();
      console.error(
        "Expected JSON but got:",
        contentType,
        responseText.substring(0, 200),
      );
      alert("Payment service error: Invalid response format");
      return;
    }

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("No checkout URL received:", data);
      alert("Payment failed: No checkout URL received");
    }
  } catch (error) {
    console.error("Purchase Failed:", error);
    alert(
      `Purchase failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
