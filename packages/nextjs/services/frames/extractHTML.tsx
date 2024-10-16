export function parseHtmlString(htmlString: string) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const firstChild = tempDiv.firstChild;

  // Check if there is a first child and if it is an element node
  if (!firstChild || firstChild.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  // Ensure the first child is not an <img> element
  if (firstChild.nodeName === "IMG") {
    return null;
  }

  // @ts-ignore
  const styleString = firstChild.getAttribute("style");
  const styleObject: Record<string, string> = {};

  // Convert the style string to a JavaScript object if it exists
  if (styleString) {
    styleString.split(";").forEach((style: string) => {
      const [key, value] = style.split(":").map(s => s.trim());
      if (key && value) {
        // Remove single quotes from the values
        styleObject[key] = value.replace(/'/g, "").trim();
      }
    });
  }

  // Extract content
  const content = tempDiv.innerText.trim() || "Select your fruit!"; // Default content

  // Return the structured object
  return {
    image: {
      type: "html",
      style: styleObject,
      content: content,
    },
  };
}

// Example usage
const htmlInput = `<div style="color: 'black'; height: '300px'; width: '300px'; display: 'flex'; font-size: 60px;"> Select your fruit! </div>`;
const result = parseHtmlString(htmlInput);
console.log(result);
