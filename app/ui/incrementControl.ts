import { Group, Path, Point, PointText, Raster, Rectangle, Size } from "paper";
import { colors } from "../colors";
import { createButton } from "./createButton";


export function createIncrementComponents(onIncrement, onDecrement) {
  function incrementButton(path, onPress) {
    const icon = new Raster(path);
    icon.scale(0.45);
    return createButton(icon, 20, onPress, {
      highlightedColor: colors.paperOverlay.color,
      selectedColor: colors.paperOverlay2.color,
    });
  }
  const increment = incrementButton('static/img/ui-plus.png', onIncrement);
  const decrement = incrementButton('static/img/ui-minus.png', onDecrement);

  const text = new PointText(new Point(0, 28));
  text.fontFamily = 'TTNorms, sans-serif';
  text.fontSize = 14;
  text.fillColor = colors.text.color;
  text.justification = 'center';

  return {
    increment: increment,
    decrement: decrement,
    text: text,
  };
}

export function createVerticalIncrementControl(increment, decrement, height, image, imageMargin) {

  const backingWidth = 42;
  height = height || 153;
  const backing = new Path.Rectangle(
    new Rectangle(new Point(-backingWidth / 2, 0), new Point(backingWidth / 2, height)),
    new Size(backingWidth / 2, backingWidth / 2));
  backing.strokeColor = colors.paperOverlay2.color;
  backing.strokeWidth = 2;

  decrement.position = new Point(0, height - 20 - 1); // button radius and half stroke width
  increment.position = decrement.position.subtract(new Point(0, 40));

  image.bounds.topCenter = new Point(0, imageMargin);

  const group = new Group();
  group.addChildren([backing, increment, decrement, image]);
  return group;
}

function container(components) {
  var content = new Group();
  content.applyMatrix = false;
  content.addChildren(components);
  var size = 0;
  var spacing = 12;
  content.children.forEach(function(component) {
    component.bounds.topCenter = new Point(0, size);
    size += component.bounds.height + spacing;
  });

  var padding = 13;
  var backing = new Path.Rectangle(
    new Rectangle(new Point(0, 0), new Point(65, content.bounds.height + padding * 2)),
    new Size(30, 30));
  backing.fillColor = colors.paper.color;
  backing.bounds.topCenter = new Point(0, -padding);

  var container = new Group();
  container.applyMatrix = false;
  container.addChildren([backing, content]);

  return container;
}
