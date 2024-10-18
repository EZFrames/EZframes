/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput, parseEther } from "frog";
import { FrameData } from "frog/_lib/types/frame";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { ABI } from "~~/constants";
import Analytics from "~~/model/analytics";
import { getFrameAtServer } from "~~/services/frames";
import { Frame } from "~~/types/commontypes";
import { makeFrogFrame, parseHtmlToJsxNode } from "~~/utils/general";

const app = new Frog({
  basePath: "/api/frog",
  title: "Frog Frame",
  headers: {
    "Cache-Control": "no-store, must-revalidate", // Ensures no caching
    cache: "no-store", // For any additional cache headers
  },
});

export const revalidate = 0;

const storeAnalytics = async (frameData: FrameData, journeyId: string, frameId: string, type: string) => {
  const analyticsEntry = new Analytics({
    journeyId: journeyId || "",
    frameId: frameId || "",
    fid: frameData.fid,
    buttonClicked: frameData.buttonIndex || 0,
    inputtedText: frameData.inputText || "",
    timestamp: frameData.timestamp,
    typeOfFrame: type || "",
    state: frameData.state || "",
  });
  await analyticsEntry.save();
};

app.frame(`/:journeyId/:frameId`, async c => {
  const match = c.req.path.match(/^\/api\/frog\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)$/);

  if (!match || match.length < 3) {
    throw new Error("Invalid journey or frame ID");
  }
  const [, journeyId, frameId] = match;
  if (c.req.method === "POST") {
    storeAnalytics(c.frameData as FrameData, journeyId, frameId, "submit-frame");
  }
  // await storeAnalytics(c.frameData as FrameData, journeyId, frameId[1], "render-frame");
  const data: Frame = await getFrameAtServer(frameId);
  const frame = makeFrogFrame(data.frameJson);
  const intents = frame.intents.map((intent: any) => {
    const props = intent.props || {};
    switch (true) {
      case intent.type === "Button":
        return (
          <Button value={props.value} action={props.action}>
            {intent.content}
          </Button>
        );
      case intent.type === "Button.Link":
        return <Button.Link href={props.href}>{intent.content}</Button.Link>;
      case intent.type === "Button.Mint":
        return <Button.Mint target={props.target}>{intent.content}</Button.Mint>;
      case intent.type === "Button.Redirect":
        return <Button.Redirect location={props.location}>{intent.content}</Button.Redirect>;
      case intent.type === "Button.Reset":
        return <Button.Reset>{intent.content}</Button.Reset>;
      case intent.type === "Button.Transaction":
        return <Button.Transaction target={props.target}>{intent.content}</Button.Transaction>;
      case intent.type.includes("TextInput"):
        return <TextInput placeholder={props.placeholder} />;
      default:
        return null;
    }
  });
  const image = frame.image.type === "src" ? frame.image.src : `/${journeyId}/${frameId}/img`;
  return c.res({
    headers: {
      "Cache-Control": "max-age=0",
    },
    image: image as string,
    intents,
  });
});

app.transaction("/:journeyId/:frameId/send-ether", async c => {
  const match = c.req.path.match(/\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)/);

  if (!match || match.length < 3) {
    throw new Error("Invalid journey or frame ID");
  }
  const [, journeyId, frameId] = match;

  storeAnalytics(c.frameData as FrameData, journeyId, frameId, "send-ether");
  return c.send({
    chainId: "eip155:10",
    to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
    value: parseEther("1"),
  });
});

app.transaction("/:journeyId/:frameId/send-contract", c => {
  const match = c.req.path.match(/\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)/);

  if (!match || match.length < 3) {
    throw new Error("Invalid journey or frame ID");
  }
  const [, journeyId, frameId] = match;

  storeAnalytics(c.frameData as FrameData, journeyId, frameId, "contract-transaction");

  return c.contract({
    chainId: "eip155:10",
    abi: ABI,
    functionName: "transfer",
    args: [],
    to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
  });
});

app.image("/:journeyId/:frameId/img", async c => {
  const match = c.req.path.match(/^\/api\/frog\/([a-zA-Z0-9]+)\/([a-zA-Z0-9]+)\/img$/);
  if (!match || match.length < 3) {
    throw new Error("Invalid journey or frame ID");
  }

  const [, , frameId] = match;
  const data: Frame = await getFrameAtServer(frameId);
  const frame = makeFrogFrame(data.frameJson);
  const parsedHTML = parseHtmlToJsxNode(frame.image.content as string);
  return c.res({
    headers: {
      "Cache-Control": "max-age=0",
    },
    image: parsedHTML as any,
  });
});

devtools(app, { serveStatic });
export const GET = handle(app);
export const POST = handle(app);
