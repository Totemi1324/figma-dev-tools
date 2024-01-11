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
 * Main template generator for _theme data_ in Flutter. It converts Figma text and color styles into code for a ready-to-implement Cubit service.
 */
export const getCodeTemplate = function (settings: Settings): string {
    return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
${useFlutterGen(settings.useFlutterGen)}

class ThemeService extends Cubit<ThemeData> {
  ${}

  ${}

  ${}
  
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