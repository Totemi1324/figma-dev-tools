import { generateThemeData } from "./functions/genThemeData";

figma.showUI(__html__);
figma.ui.resize(500, 600);

figma.ui.onmessage = msg => {
    switch (msg.type) {
        case "gen-theme-data":
            generateThemeData();
            break;
    }
  /*if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();*/
};
