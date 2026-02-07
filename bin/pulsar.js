#!/usr/bin/env node
import { createCLI } from '../dist/index.js';

const cli = createCLI();
cli.run(process.argv);
