"use strict";
class BRHelper {
    #state;
    #ui;
    constructor() {
        this.#state = {
            live_count: 0,
            blank_count: 0,
            total_count: 0,
            islive_chance: 0,
            isblank_chance: 0,
        };
        this.#ui = {
            live_count: document.querySelector('.shell.live .count'),
            blank_count: document.querySelector('.shell.blank .count'),
            islive_chance: document.querySelector('.islive_chance'),
            isblank_chance: document.querySelector('.isblank_chance'),
            add_live: document.querySelector('.shell.live .add'),
            rem_live: document.querySelector('.shell.live .rem'),
            reset_live: document.querySelector('.shell.live .reset'),
            add_blank: document.querySelector('.shell.blank .add'),
            rem_blank: document.querySelector('.shell.blank .rem'),
            reset_blank: document.querySelector('.shell.blank .reset'),
        };
        this.#ui.add_live.addEventListener('click', () => this.#recount('live', 'add'));
        this.#ui.rem_live.addEventListener('click', () => this.#recount('live', 'rem'));
        this.#ui.reset_live.addEventListener('click', () => this.#recount('live', 'reset'));
        this.#ui.add_blank.addEventListener('click', () => this.#recount('blank', 'add'));
        this.#ui.rem_blank.addEventListener('click', () => this.#recount('blank', 'rem'));
        this.#ui.reset_blank.addEventListener('click', () => this.#recount('blank', 'reset'));
        this.#update_ui();
    }
    #update_ui() {
        this.#ui.live_count.textContent = String(this.#state.live_count);
        this.#ui.blank_count.textContent = String(this.#state.blank_count);
        this.#ui.islive_chance.textContent = String(this.#state.islive_chance.toFixed(2));
        this.#ui.isblank_chance.textContent = String(this.#state.isblank_chance.toFixed(2));
    }
    #recount(shell_type, operation) {
        if (operation == 'add') {
            this.#state[`${shell_type}_count`] += 1;
            this.#state.total_count += 1;
        }
        if (operation == 'rem') {
            if (this.#state[`${shell_type}_count`] <= 0) {
                return;
            }
            this.#state[`${shell_type}_count`] -= 1;
            this.#state.total_count -= 1;
        }
        if (operation == 'reset') {
            this.#state.total_count -= this.#state[`${shell_type}_count`];
            this.#state[`${shell_type}_count`] = 0;
        }
        if (this.#state.total_count <= 0) {
            this.#state.islive_chance = 0;
            this.#state.isblank_chance = 0;
        }
        else {
            this.#state.islive_chance = (this.#state.live_count / this.#state.total_count) * 100;
            this.#state.isblank_chance = (this.#state.blank_count / this.#state.total_count) * 100;
        }
        this.#update_ui();
    }
}
window.addEventListener('load', () => {
    new BRHelper();
});
