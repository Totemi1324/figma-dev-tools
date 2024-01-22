/**
 * Represents a brightess attribute, analogous to the `Brightness` class in Flutter
 */
export enum Brightness {
  LIGHT,
  DARK
};

/**
 * Contains data to fill in the code template with.
 * @param {boolean} useFlutterGen - Whether FlutterGen will be used in the project or not.
 * @param {Brightness} brightness - The brightness category of the Flutter theme
 * @param {TextStyle[]} textStyles - The Figma text styles to convert to code
 * @param {FontName} mainFont - The font that should be used as a main font and as the fallback font
 */
export interface Settings {
  useFlutterGen: boolean;
  brightness: Brightness;
  textStyles: TextStyle[];
  mainFont: FontName;
};

/**
 * Standardized interface for text styles that adhere the Material 3 typescale (https://m3.material.io/styles/typography/type-scale-tokens)
 * @param {Tokens} token - The token the style belongs to
 * @param {Style} style - The style that further specifies the token
 * @param {string} family - The font family
 * @param {number} size - The font size
 * @param {number} weight - The font weight (only multiples of 100 from 100-900 allowed)
 */
interface MaterialTextStyle {
  token: Tokens,
  style: Style,
  family: string,
  size: number,
  weight: number,
}

enum Tokens {
  DISPLAY,
  HEADLINE,
  TITLE,
  BODY,
  LABEL
}

enum Style {
  LARGE,
  MEDIUM,
  SMALL
}

/**
 * Main template generator for _theme data_ in Flutter. It converts Figma text and color styles into code for a ready-to-implement Cubit service.
 */
export const getCodeTemplate = function (settings: Settings): string {
  let materialTextStyles: MaterialTextStyle[] = [];

  settings.textStyles.forEach(style => {
    materialTextStyles.push(convertToMaterialTextStyle(style));
  });

  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
${useFlutterGen(settings.useFlutterGen)}

class ThemeService extends Cubit<ThemeData> {
  ${}

  ${textStyleGeneratorFunctions(materialTextStyles)}

  ${textStyles(materialTextStyles)}
  
  static final _mainTheme = ThemeData(
    brightness: ${},
    fontFamily: ${},
    colorScheme: ${},
    fontFamilyFallback: const [
      ${}
    ],
    ${}
  );

  ThemeService() : super(_mainTheme);

  static ThemeData currentTheme = _mainTheme;
}
`;
}

/**
 * Code template for import statement of FlutterGen
 */
const useFlutterGenTemplate: string = `import 'package:flutter_gen/gen/fonts.gen.dart';`;

const useFlutterGen = function (useGen: boolean): string {
  return useGen ? useFlutterGenTemplate : "";
}

/**
 * Code template for Material 3 color style
 */
// TODO

/**
 * Code template for TextStyle generator functions
 */
const textStyleGeneratorFunctionsTemplate = function (fontName: string): string {
  return `static TextStyle ${fontName}Style(double size, FontWeight weight) => TextStyle(
    fontFamily: FontFamily.${fontName},
    fontSize: size,
    fontWeight: weight,
  );`;
}

const textStyleGeneratorFunctions = function (styles: MaterialTextStyle[]): string {
  var result: string = "";
  const families: Set<string> = new Set();

  styles.forEach(style => {
    families.add(style.family);
  });

  families.forEach(family => {
    result += textStyleGeneratorFunctionsTemplate(family) + "\n";
  });

  return result;
}

/**
 * Code template for TextStyle variables
 */
const textStylesTemplate = function (varName: string, fontName: string, size: number, weight: number): string {
  return `static final ${varName} = ${fontName}Style(${size}, FontWeight.w${weight});`;
}

const textStyles = function (styles: MaterialTextStyle[]): string {
  var result: string = "";
  
  styles.forEach(style => {
    result += textStylesTemplate(toVariableName(style), style.family, style.size, style.weight) + "\n";
  });
}

// --- HELPER FUNCTIONS ---

const convertToMaterialTextStyle = function (figmaStyle: TextStyle): MaterialTextStyle {
  var result: MaterialTextStyle = {
    token: Tokens.BODY,
    style: Style.MEDIUM,
    family: "not_found",
    size: 0,
    weight: 100,
  }
  var components: string[] = figmaStyle.name.split(" ");

  if (components.length >= 1) {
    var ref: string = components[0].toLowerCase();
    switch (ref) {
      case "display":
        result.token = Tokens.DISPLAY;
        break;
      case "headline":
        result.token = Tokens.HEADLINE;
        break;
      case "title":
        result.token = Tokens.TITLE;
        break;
      case "body":
        result.token = Tokens.BODY;
        break;
      case "label":
        result.token = Tokens.LABEL;
        break;
      default:
        break;
    }
  }
  if (components.length >= 2) {
    var ref: string = components[1].toLowerCase();
    switch (ref) {
      case "large":
        result.style = Style.LARGE;
        break;
      case "medium":
        result.style = Style.MEDIUM;
        break;
      case "small":
        result.style = Style.SMALL;
        break;
      default:
        break;
    }
  }

  result.family = firstLetterToLowerCase(figmaStyle.fontName.family);
  result.size = figmaStyle.fontSize;
  switch (figmaStyle.fontName.style.toLowerCase()) {
    case "thin":
      result.weight = 100;
      break;
    case "extralight":
      result.weight = 200;
      break;
    case "light":
      result.weight = 300;
      break;
    case "regular":
      result.weight = 400;
      break;
    case "medium":
      result.weight = 500;
      break;
    case "semibold":
      result.weight = 600;
      break;
    case "bold":
      result.weight = 700;
      break;
    case "extrabold":
      result.weight = 800;
      break;
    case "black":
      result.weight = 900;
      break;
    default:
      break;
  }

  return result;
}

const firstLetterToLowerCase = function (str: string): string {
  return str.substring(0,1).toLowerCase() + str.substring(1);
}

const toVariableName = function (style: MaterialTextStyle) {
  var result: string = "_";

  switch (style.token) {
    case Tokens.DISPLAY:
      result += "display";
      break;
    case Tokens.HEADLINE:
      result += "headline";
      break;
    case Tokens.TITLE:
      result += "title";
      break;
    case Tokens.BODY:
      result += "body";
      break;
    case Tokens.LABEL:
      result += "label";
      break;
    default:
      break;
  }

  switch (style.style) {
    case Style.LARGE:
      result += "Large";
      break;
    case Style.MEDIUM:
      result += "Medium";
      break;
    case Style.SMALL:
      result += "Small";
      break;
    default:
      break;
  }

  return result;
}