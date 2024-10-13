import { useEffect, useState } from "react";
import CustomButton from "./Button/CustomButton";
import { MenuItem, Select, TextField } from "@mui/material";
import { APP_URL } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById, removeTxUrl, removeUrl } from "~~/services/frames";
import { Frame, Intent } from "~~/types/commontypes";

interface ButtonEditorProps {
  button: Intent;
  onSave: (button: Intent) => void;
  onDelete: () => void;
}

const chainIds = {
  Ethereum: "eip155:1",
  Arbitrum: "eip155:42161",
  Base: "eip155:8453",
  Degen: "eip155:666666666",
  Gnosis: "eip155:100",
  Optimism: "eip155:10",
  Zora: "eip155:7777777",
  Polygon: "eip155:137",
  Sepolia: "eip155:11155111", // Ethereum Sepolia Testnet
  ArbitrumSepolia: "eip155:421614", // Arbitrum Sepolia Testnet
  BaseSepolia: "eip155:84532", // Base Sepolia Testnet
  OptimismSepolia: "eip155:11155420", // Optimism Sepolia Testnet
};

const ButtonEditor = ({ button, onSave, onDelete }: ButtonEditorProps) => {
  const { frames: dbFrames, frame, productID } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>();
  useEffect(() => {
    if (dbFrames) {
      Promise.all(dbFrames.map(frame => getFrameById(frame)))
        .then(data => setFrames(data))
        .catch(error => console.error("Error fetching frames:", error));
    }
  }, [dbFrames]);

  if (!frame) return null;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
        Button Label
      </label>
      <TextField
        id="buttonLabel"
        size="small"
        value={button.content as string}
        onChange={e => {
          onSave({ ...button, content: e.target.value as string });
        }}
      />
      <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
        Button Type
      </label>
      <Select
        id="buttonType"
        value={button.type}
        onChange={e => {
          onSave({ ...button, type: e.target.value as Intent["type"] });
        }}
        variant="outlined"
        size="small"
      >
        <MenuItem value="Button">Button</MenuItem>
        <MenuItem value="Button.Link">Link</MenuItem>
        <MenuItem value="Button.Mint">Mint</MenuItem>
        <MenuItem value="Button.Reset">Reset</MenuItem>
        <MenuItem value="Button.Location">Location</MenuItem>
        <MenuItem value="Button.Transaction">Transaction</MenuItem>
      </Select>
      {button.type === "Button" && (
        <>
          <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
            Button Value
          </label>
          <TextField
            id="buttonValue"
            size="small"
            value={button.props.value as string}
            onChange={e => {
              onSave({ ...button, props: { ...button.props, value: e.target.value as string } });
            }}
          />
          <label htmlFor="buttonType" className="block text-sm font-medium text-gray-700 mb-1">
            Next Frame
          </label>
          <Select
            id="post"
            size="small"
            value={removeUrl(button.props.action as string, productID)}
            variant="outlined"
            onChange={e =>
              onSave({
                ...button,
                props: { ...button.props, action: `${APP_URL}/api/frog/${productID}/` + e.target.value },
              })
            }
          >
            {frames?.map(
              (f, index) =>
                f._id !== frame?._id && (
                  <MenuItem key={index} value={f._id}>
                    {f.name}
                  </MenuItem>
                ),
            )}
          </Select>
        </>
      )}
      {button.type === "Button.Link" && (
        <>
          <label htmlFor="buttonHref" className="block text-sm font-medium text-gray-700 mb-1">
            Button href
          </label>
          <TextField
            id="buttonHref"
            size="small"
            value={button.props.href as string}
            onChange={e => {
              onSave({ ...button, props: { ...button.props, href: e.target.value as string } });
            }}
          />
        </>
      )}
      {button.type === "Button.Mint" && (
        <>
          <label htmlFor="buttonMint" className="block text-sm font-medium text-gray-700 mb-1">
            Mint Target
          </label>
          <TextField
            id="buttonMint"
            size="small"
            value={button.props.target as string}
            onChange={e => {
              onSave({ ...button, props: { ...button.props, target: e.target.value as string } });
            }}
          />
        </>
      )}
      {button.type === "Button.Location" && (
        <>
          <label htmlFor="buttonLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Button Location
          </label>
          <TextField
            id="buttonLocation"
            size="small"
            value={button.props.location as string}
            onChange={e =>
              onSave({
                ...button,
                props: { ...button.props, action: `${APP_URL}/api/frog/${productID}/` + e.target.value },
              })
            }
          />
        </>
      )}
      {button.type === "Button.Transaction" && (
        <>
          <label htmlFor="buttonTx" className="block text-sm font-medium text-gray-700 mb-1">
            Tx Target
          </label>
          <Select
            id="post"
            size="small"
            value={removeTxUrl(button.props.target as string, productID, frame?._id)}
            variant="outlined"
            onChange={e =>
              onSave({
                ...button,
                props: {
                  ...button.props,
                  target: `${APP_URL}/api/frog/${productID}/${frame?._id}/` + e.target.value,
                },
              })
            }
          >
            <MenuItem value="send-contract">Contract interaction</MenuItem>
            <MenuItem value="send-ether">P2P transfer</MenuItem>
          </Select>
          <label htmlFor="buttonTx" className="block text-sm font-medium text-gray-700 mb-1">
            Tx Success
          </label>
          <Select
            id="post"
            size="small"
            value={removeUrl(button.props.action as string, productID)}
            variant="outlined"
            onChange={e =>
              onSave({
                ...button,
                props: { ...button.props, action: `${APP_URL}/api/frog/${productID}/` + e.target.value },
              })
            }
          >
            {frames?.map(
              (f, index) =>
                f._id !== frame?._id && (
                  <MenuItem key={index} value={f._id}>
                    {f.name}
                  </MenuItem>
                ),
            )}
          </Select>
          {button.props.target?.includes("send-ether") && (
            <>
              <label htmlFor="chainId" className="block text-sm font-medium text-gray-700 mb-1">
                Chain ID
              </label>
              <Select id="chainId" size="small" value="" variant="outlined" onChange={e => console.log(e)}>
                {Object.entries(chainIds).map(([chainName, chainId], index) => (
                  <MenuItem key={index} value={chainId}>
                    {chainName}
                  </MenuItem>
                ))}
              </Select>
              <label htmlFor="toAddress" className="block text-sm font-medium text-gray-700 mb-1">
                To Address
              </label>
              <TextField id="toAddress" size="small" value="" onChange={e => console.log(e.target.value)} />
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                Value
              </label>
              <TextField id="value" size="small" value="" onChange={e => console.log(e.target.value)} />
            </>
          )}
          {button.props.target?.includes("send-contract") && (
            <>
              <label htmlFor="chainId" className="block text-sm font-medium text-gray-700 mb-1">
                Chain ID
              </label>
              <Select id="chainId" size="small" value="" variant="outlined" onChange={e => console.log(e)}>
                {Object.entries(chainIds).map(([chainName, chainId], index) => (
                  <MenuItem key={index} value={chainId}>
                    {chainName}
                  </MenuItem>
                ))}
              </Select>
              <label htmlFor="toAddress" className="block text-sm font-medium text-gray-700 mb-1">
                To Address
              </label>
              <TextField id="toAddress" size="small" value="" onChange={e => console.log(e.target.value)} />
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                Contract Address (fetch ABI)
              </label>
              <TextField id="value" size="small" value="" onChange={e => console.log(e.target.value)} />
              <label htmlFor="functionName" className="block text-sm font-medium text-gray-700 mb-1">
                Function Name
              </label>
              <TextField id="functionName" size="small" value="" onChange={e => console.log(e.target.value)} />
            </>
          )}
        </>
      )}
      <CustomButton buttonType="delete" variant="contained" onClick={onDelete} size="small">
        Delete Button
      </CustomButton>
    </div>
  );
};

export default ButtonEditor;
