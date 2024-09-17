/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { TRIAL_FRAME } from "~~/constants";
import { makeFrogFrame } from "~~/utils/general";

const app = new Frog({
  basePath: "/api/frog",
  title: "Frog Frame",
});

app.frame(`/:frameId`, async c => {
  const frameId = c.req.path.match(/\/api\/frog\/(\d+)/);
  if (!frameId) {
    throw new Error("Invalid frame ID");
  }

  const frame = makeFrogFrame(TRIAL_FRAME);

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

  return c.res({
    image: <div style={frame.image.style}>{frame.image.content}</div>,
    intents,
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);