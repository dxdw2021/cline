import { describe, it } from "mocha"
import * as os from "os"
import * as path from "path"
import "should"
import { arePathsEqual, getReadablePath } from "./path"

describe("Path Utilities", () => {
	describe("arePathsEqual", () => {
		it("should handle undefined paths", () => {
			arePathsEqual(undefined, undefined).should.equal(true)
			arePathsEqual("foo", undefined).should.equal(false)
			arePathsEqual(undefined, "foo").should.equal(false)
		})

		it("should handle case sensitivity based on platform", () => {
			if (process.platform === "win32") {
				arePathsEqual("FOO/BAR", "foo/bar").should.equal(true)
			} else {
				arePathsEqual("FOO/BAR", "foo/bar").should.equal(false)
			}
		})

		it("should handle normalized paths", () => {
			arePathsEqual("/tmp/./dir", "/tmp/../tmp/dir").should.equal(true)
			arePathsEqual("/tmp/./dir", "/tmp/../dir").should.equal(false)
		})
	})

	describe("getReadablePath", () => {
		it("should handle desktop path", () => {
			const desktop = path.join(os.homedir(), "Desktop")
			const testPath = path.join(desktop, "test.txt")
			getReadablePath(desktop, "test.txt").should.equal(testPath.replace(/\\/g, "/"))
		})

		it("should show relative paths within cwd", () => {
			const cwd = "/home/user/project"
			const filePath = "/home/user/project/src/file.txt"
			getReadablePath(cwd, filePath).should.equal("src/file.txt")
		})

		it("should show basename when path equals cwd", () => {
			const cwd = "/home/user/project"
			getReadablePath(cwd, cwd).should.equal("project")
		})

		it("should show absolute path when outside cwd", () => {
			const cwd = "/home/user/project"
			const filePath = "/home/user/other/file.txt"
			getReadablePath(cwd, filePath).should.equal(filePath)
		})
	})
})
