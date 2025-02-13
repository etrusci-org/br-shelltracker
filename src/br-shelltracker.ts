type BRShellTrackerState = {
    live_count: number
    blank_count: number
    total_count: number
    islive_chance: number
    isblank_chance: number
}


type BRShellTrackerUI = {
    app: HTMLElement
    live_count: HTMLElement
    blank_count: HTMLElement
    islive_chance: HTMLElement
    isblank_chance: HTMLElement
    add_live: HTMLElement
    rem_live: HTMLElement
    reset_live: HTMLElement
    add_blank: HTMLElement
    rem_blank: HTMLElement
    reset_blank: HTMLElement
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


class BRShellTracker
{
    static v: number = 7
    #state: BRShellTrackerState
    #ui: BRShellTrackerUI


    constructor()
    {
        this.#state = {
            live_count: 0,
            blank_count: 0,
            total_count: 0,
            islive_chance: 0,
            isblank_chance: 0,
        }

        this.#ui = {
            app: document.querySelector('.app') as HTMLElement,
            live_count: document.querySelector('.shell.live .count') as HTMLElement,
            blank_count: document.querySelector('.shell.blank .count') as HTMLElement,
            islive_chance: document.querySelector('.islive_chance') as HTMLElement,
            isblank_chance: document.querySelector('.isblank_chance') as HTMLElement,
            add_live: document.querySelector('.shell.live .add') as HTMLElement,
            rem_live: document.querySelector('.shell.live .rem') as HTMLElement,
            reset_live: document.querySelector('.shell.live .reset') as HTMLElement,
            add_blank: document.querySelector('.shell.blank .add') as HTMLElement,
            rem_blank: document.querySelector('.shell.blank .rem') as HTMLElement,
            reset_blank: document.querySelector('.shell.blank .reset') as HTMLElement,
        }

        this.#ui.add_live.addEventListener('click', () => this.#recount('live', 'add'))
        this.#ui.rem_live.addEventListener('click', () => this.#recount('live', 'rem'))
        this.#ui.reset_live.addEventListener('click', () => this.#recount('live', 'reset'))
        this.#ui.add_blank.addEventListener('click', () => this.#recount('blank', 'add'))
        this.#ui.rem_blank.addEventListener('click', () => this.#recount('blank', 'rem'))
        this.#ui.reset_blank.addEventListener('click', () => this.#recount('blank', 'reset'))

        this.#ui.app.classList.remove('hidden')

        this.#update_ui()
    }


    #update_ui(): void
    {
        this.#ui.live_count.textContent = String(this.#state.live_count)
        this.#ui.blank_count.textContent = String(this.#state.blank_count)
        this.#ui.islive_chance.textContent = String(this.#state.islive_chance.toFixed(2))
        this.#ui.isblank_chance.textContent = String(this.#state.isblank_chance.toFixed(2))
    }


    #recount(shell_type: 'live' | 'blank', operation: 'add' | 'rem' | 'reset'): void
    {
        if (operation == 'add') {
            this.#state[`${shell_type}_count`] += 1
            this.#state.total_count += 1
        }

        if (operation == 'rem') {
            if (this.#state[`${shell_type}_count`] <= 0) {
                return
            }
            this.#state[`${shell_type}_count`] -= 1
            this.#state.total_count -= 1
        }

        if (operation == 'reset') {
            this.#state.total_count -= this.#state[`${shell_type}_count`]
            this.#state[`${shell_type}_count`] = 0
        }

        if (this.#state.total_count <= 0) {
            this.#state.islive_chance = 0
            this.#state.isblank_chance = 0
        }
        else {
            this.#state.islive_chance = (this.#state.live_count / this.#state.total_count) * 100
            this.#state.isblank_chance = (this.#state.blank_count / this.#state.total_count) * 100
        }

        this.#update_ui()
    }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


window.addEventListener('load', () => {
    const s = document.createElement('link')
    s.setAttribute('rel', 'stylesheet')
    s.setAttribute('href', `./br-shelltracker.css?v=${BRShellTracker.v}`)
    document.head.append(s)

    new BRShellTracker()
})
