import * as core from '@actions/core';
import * as fs from 'node:fs/promises';
import { BaseCommand } from './base-command';
import type { ChangelogOptions } from '../types/options';
import type { CutverRunner } from '../runner/cutver-runner';

export class ChangelogCommand extends BaseCommand<string> {
    constructor(runner: CutverRunner, private readonly options: ChangelogOptions) {
        super(runner);
    }

    async execute(): Promise<string> {
        core.info('Extrayendo últimas notas de release (cutver changelog latest)...');
        const notes = await this.runner.run(['changelog', 'latest']);

        if (!notes) {
            core.warning('No se obtuvo texto de "cutver changelog latest".');
        }

        await fs.writeFile(this.options.notesFile, notes, 'utf-8');
        core.info(`Notas guardadas en: ${this.options.notesFile}`);

        return notes;
    }
}