import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      const defaultToolbarItems = PSPDFKit.defaultDocumentEditorToolbarItems;
      const items = PSPDFKit.defaultToolbarItems;

      const newItems = items.filter((item) => item.type !== "export-pdf");
      console.log(newItems);

      await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: props.document,
        // toolbarItems: PSPDFKit.defaultToolbarItems.concat([downloadButton]),
        toolbarItems: newItems,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
