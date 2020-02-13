#!/usr/bin/env node
import process from "process";
import RibosomeStream from "./";
process.stdin.pipe(new RibosomeStream()).pipe(process.stdout);
