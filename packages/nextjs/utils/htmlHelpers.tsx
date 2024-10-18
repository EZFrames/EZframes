import cheerio from "cheerio";

type JSXNode = {
  tag: string;
  props: {
    [key: string]: any;
    children?: (JSXNode | string)[];
  };
  children?: (JSXNode | string)[];
  key?: string | undefined;
  isEscaped?: boolean;
  localContexts?: undefined;
};

export function parseHtmlToJsxNode(html: string): JSXNode {
  const $ = cheerio.load(html);
  function parseElement(element: any): JSXNode {
    const tag = element.tagName || ""; // Get the tag name
    const attribs = element.attribs || {}; // Get the attributes
    // Handle children
    const children: (JSXNode | string)[] = [];
    $(element)
      .contents()
      .each((_, el) => {
        if (el.type === "text") {
          // If it's text, just push it as a string
          children.push($(el).text().trim()); // Trim whitespace around text
        } else if (el.type === "tag") {
          // If it's an element, parse recursively
          children.push(parseElement(el));
        }
      });

    // Convert the style string to an object if it exists
    const styleString = attribs.style || "";
    const styleObject = parseStyleString(styleString);

    return {
      tag,
      props: {
        ...attribs,
        style: styleObject, // Set the style as an object
        children, // Add children
      },
      children,
      isEscaped: true, // Set this as per your requirement
      localContexts: undefined,
    };
  }
  const rootElement = $("body").children().first();
  console.log(rootElement);
  return parseElement(rootElement[0]);
}

function parseStyleString(style: string): Record<string, string> {
  return style
    .split(";") // Split styles by semicolon
    .filter(Boolean) // Remove empty strings
    .map(rule => rule.split(":")) // Split each rule by colon
    .filter(pair => pair.length === 2) // Keep only valid pairs
    .reduce((acc, [key, value]) => {
      const trimmedKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase()); // Convert to camelCase
      const trimmedValue = value.trim();
      acc[trimmedKey] = trimmedValue; // Add to accumulator
      return acc;
    }, {} as Record<string, string>);
}
