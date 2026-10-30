import { LatheGeometry, Vector2 } from "three";

export function getPieceGeometry(type: string): LatheGeometry {
  let points: Vector2[] = [];

  switch (type) {
    case "pawn": {
      points = [
        new Vector2(0, 0),
        new Vector2(0.032, 0),
        new Vector2(0.032, 0.012),
        new Vector2(0.058, 0.024),
        new Vector2(0.07, 0.034),
        new Vector2(0.07, 0.08),
        new Vector2(0.054, 0.094),
        new Vector2(0.046, 0.118),
        new Vector2(0.042, 0.146),
        new Vector2(0.05, 0.166),
      ];
      break;
    }
    case "rook": {
      points = [
        new Vector2(0, 0),
        new Vector2(0.034, 0),
        new Vector2(0.034, 0.012),
        new Vector2(0.066, 0.024),
        new Vector2(0.074, 0.038),
        new Vector2(0.074, 0.108),
        new Vector2(0.062, 0.116),
        new Vector2(0.056, 0.14),
        new Vector2(0.056, 0.156),
        new Vector2(0.068, 0.164),
        new Vector2(0.068, 0.176),
        new Vector2(0.056, 0.184),
        new Vector2(0.056, 0.192),
        new Vector2(0.068, 0.2),
        new Vector2(0.068, 0.212),
        new Vector2(0.056, 0.22),
        new Vector2(0.056, 0.23),
      ];
      break;
    }
    case "knight": {
      points = [
        new Vector2(0, 0),
        new Vector2(0.034, 0),
        new Vector2(0.034, 0.012),
        new Vector2(0.066, 0.024),
        new Vector2(0.074, 0.038),
        new Vector2(0.074, 0.112),
        new Vector2(0.06, 0.124),
        new Vector2(0.05, 0.152),
        new Vector2(0.048, 0.184),
        new Vector2(0.058, 0.21),
        new Vector2(0.066, 0.226),
        new Vector2(0.062, 0.242),
      ];
      break;
    }
    case "bishop": {
      points = [
        new Vector2(0, 0),
        new Vector2(0.034, 0),
        new Vector2(0.034, 0.012),
        new Vector2(0.066, 0.024),
        new Vector2(0.074, 0.038),
        new Vector2(0.074, 0.116),
        new Vector2(0.058, 0.13),
        new Vector2(0.05, 0.156),
        new Vector2(0.048, 0.19),
        new Vector2(0.056, 0.216),
        new Vector2(0.064, 0.234),
        new Vector2(0.062, 0.252),
        new Vector2(0.052, 0.262),
      ];
      break;
    }
    case "queen": {
      points = [
        new Vector2(0, 0),
        new Vector2(0.034, 0),
        new Vector2(0.034, 0.012),
        new Vector2(0.068, 0.024),
        new Vector2(0.076, 0.038),
        new Vector2(0.076, 0.13),
        new Vector2(0.06, 0.144),
        new Vector2(0.052, 0.174),
        new Vector2(0.05, 0.214),
        new Vector2(0.058, 0.238),
        new Vector2(0.07, 0.258),
        new Vector2(0.07, 0.27),
        new Vector2(0.06, 0.278),
      ];
      break;
    }
    case "king": {
      points = [
        new Vector2(0, 0),
        new Vector2(0.034, 0),
        new Vector2(0.034, 0.012),
        new Vector2(0.068, 0.024),
        new Vector2(0.076, 0.038),
        new Vector2(0.076, 0.134),
        new Vector2(0.06, 0.148),
        new Vector2(0.052, 0.182),
        new Vector2(0.05, 0.226),
        new Vector2(0.06, 0.252),
        new Vector2(0.074, 0.274),
        new Vector2(0.074, 0.288),
        new Vector2(0.062, 0.296),
      ];
      break;
    }
    default:
      points = [new Vector2(0, 0), new Vector2(0.05, 0), new Vector2(0.05, 0.14)];
      break;
  }

  const geometry = new LatheGeometry(points, 128);
  geometry.computeVertexNormals();
  return geometry;
}