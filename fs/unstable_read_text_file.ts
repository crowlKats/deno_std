// Copyright 2018-2025 the Deno authors. MIT license.

import { mapError } from "./_map_error.ts";
import type { ReadFileOptions } from "./unstable_types.ts";
import { isDeno } from "./_utils.ts";
import { readFile, readFileSync } from "./unstable_read_file.ts";

/**
 * Asynchronously reads and returns the entire contents of a file as an UTF-8 decoded string.
 *
 * Reading a directory throws an error.
 *
 * Requires `allow-read` permission.
 *
 * @example Usage
 * ```ts
 * import { assert } from "@std/assert";
 * import { readTextFile } from "@std/fs/unstable-read-text-file";
 *
 * const content = await readTextFile("README.md"); // full content of README.md
 *
 * assert(content.length > 0);
 * ```
 *
 * @tags allow-read
 *
 * @param path The path of the symbolic link.
 * @param options Options when reading a file. See {@linkcode ReadFileOptions}.
 * @returns A promise that resolves to string of the file content.
 */
export async function readTextFile(
  path: string | URL,
  options?: ReadFileOptions,
): Promise<string> {
  if (isDeno) {
    return Deno.readTextFile(path, { ...options });
  } else {
    try {
      const decoder = new TextDecoder("utf-8");
      const data = await readFile(path, options);
      return decoder.decode(data);
    } catch (error) {
      throw mapError(error);
    }
  }
}

/**
 * Synchronously reads and returns the entire contents of a file as an UTF-8 decoded string.
 *
 * Reading a directory throws an error.
 *
 * Requires `allow-read` permission.
 *
 * @example Usage
 * ```ts
 * import { assert } from "@std/assert";
 * import { readTextFileSync } from "@std/fs/unstable-read-text-file";
 *
 * const content = readTextFileSync("README.md"); // full content of README.md
 *
 * assert(content.length > 0);
 * ```
 *
 * @tags allow-read
 *
 * @param path The path of the symbolic link.
 * @returns The string of file content.
 */
export function readTextFileSync(
  path: string | URL,
): string {
  if (isDeno) {
    return Deno.readTextFileSync(path);
  } else {
    try {
      const decoder = new TextDecoder("utf-8");
      const data = readFileSync(path);
      return decoder.decode(data);
    } catch (error) {
      throw mapError(error);
    }
  }
}
