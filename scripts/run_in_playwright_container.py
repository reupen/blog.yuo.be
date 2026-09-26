#!/usr/bin/env python3
import argparse
import os
from pathlib import PurePath
from platform import system
from subprocess import run

from utils.npm import get_dependency_version

ROOT_DIR = PurePath(__file__).parents[1]
CONTAINER_RUNNER = os.environ.get(
    "CONTAINER_RUNNER", "wslc" if system() == "Windows" else "podman"
)

parser = argparse.ArgumentParser()
parser.add_argument("command")


def run_in_playwright_container(arg):
    playwright_version = get_dependency_version("node_modules/@playwright/test")
    command = [
        CONTAINER_RUNNER,
        "run",
        "--rm",
        "-v",
        f"{ROOT_DIR.as_posix()}:/home/pwuser/",
        "-v",
        f"{ROOT_DIR.name}:/home/pwuser/node_modules/",
        "-w",
        "/home/pwuser/",
        "-it",
        "-e",
        "CI",
        "-e",
        "ASTRO_TELEMETRY_DISABLED=1",
        f"mcr.microsoft.com/playwright:v{playwright_version}",
        "bash",
        "-c",
        arg,
    ]
    run(command, check=True, shell=True)


if __name__ == "__main__":
    args = parser.parse_args()
    run_in_playwright_container(args.command)
