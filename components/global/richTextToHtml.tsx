/* eslint-disable react/display-name */
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";

const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        return (
          <Image
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description}
          />
        );
      },
    }
}



export default function RichTextToHtml (props: {body: any}) {
    const htmlBody = documentToReactComponents(props.body, renderOptions);
    
    return <>{htmlBody}</>;
}