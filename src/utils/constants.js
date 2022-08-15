export const SERVER_URL = "http://127.0.0.1:8000/";

export const STATE_AUTHORIZED = 1;
export const STATE_NOT_AUTHORIZED = 0;

export const GAME_STATE_MENU_REGISTER = 0;
export const GAME_STATE_MENU_LOGIN = 1;
export const GAME_STATE_START_OR_LOAD = 2;
export const GAME_STATE_RUNNING = 3;

export const GAME_STATUS_IN_PROCESS = 0;
export const GAME_STATUS_WON = 1;
export const GAME_STATUS_FAILED = 2;

export const TILE_EMPTY = 0;
export const TILE_NOT_CHECKED = -1;
export const TILE_BOMB = -2;
export const TILE_MARKED = -3;
export const TILE_BOMB_CHECKED = -4;
export const TILE_BOMB_CORRECT_MARK = -5;