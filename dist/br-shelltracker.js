"use strict";
/*
br-shelltracker <https://github.com/etrusci-org/br-shelltracker>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
class BRShellTracker {
    #state;
    #ui;
    constructor() {
        this.#state = {
            live_count: 0,
            blank_count: 0,
            total_count: 0,
            islive_chance: 0,
            isblank_chance: 0,
            hide_chance: false,
        };
        this.#ui = {
            app: document.querySelector('.app'),
            live_count: document.querySelector('.shell.live .count'),
            blank_count: document.querySelector('.shell.blank .count'),
            islive_chance: document.querySelector('.islive_chance'),
            isblank_chance: document.querySelector('.isblank_chance'),
            chance_value: document.querySelector('.chance .value'),
            chance_toggle: document.querySelector('.chance .toggle'),
            add_live: document.querySelector('.shell.live .add'),
            rem_live: document.querySelector('.shell.live .rem'),
            reset_live: document.querySelector('.shell.live .reset'),
            add_blank: document.querySelector('.shell.blank .add'),
            rem_blank: document.querySelector('.shell.blank .rem'),
            reset_blank: document.querySelector('.shell.blank .reset'),
        };
        this.#ui.add_live.addEventListener('click', (e) => this.#recount(e, 'live', 'add'));
        this.#ui.rem_live.addEventListener('click', (e) => this.#recount(e, 'live', 'rem'));
        this.#ui.reset_live.addEventListener('click', (e) => this.#recount(e, 'live', 'reset'));
        this.#ui.add_blank.addEventListener('click', (e) => this.#recount(e, 'blank', 'add'));
        this.#ui.rem_blank.addEventListener('click', (e) => this.#recount(e, 'blank', 'rem'));
        this.#ui.reset_blank.addEventListener('click', (e) => this.#recount(e, 'blank', 'reset'));
        this.#ui.chance_toggle.addEventListener('click', (e) => this.#toggle_chance(e));
        this.#update_ui(true);
    }
    #update_ui(on_init = false, on_chance_toggle = false) {
        if (on_init) {
            this.#ui.app.classList.remove('hidden');
        }
        if (on_chance_toggle) {
            this.#ui.chance_toggle.classList.toggle('on');
            if (this.#state.hide_chance) {
                this.#ui.islive_chance.textContent = '~';
                this.#ui.isblank_chance.textContent = '~';
            }
        }
        this.#ui.live_count.textContent = `${this.#state.live_count}`;
        this.#ui.blank_count.textContent = `${this.#state.blank_count}`;
        if (!this.#state.hide_chance) {
            this.#ui.islive_chance.textContent = `${this.#state.islive_chance.toFixed(2)}%`;
            this.#ui.isblank_chance.textContent = `${this.#state.isblank_chance.toFixed(2)}%`;
        }
    }
    #recount(event, shell_type, operation) {
        event.preventDefault();
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
    #toggle_chance(event) {
        event.preventDefault();
        this.#state.hide_chance = (this.#state.hide_chance) ? false : true;
        this.#update_ui(false, true);
    }
}
