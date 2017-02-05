class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		this.current = config.initial;
        this.initial = config.initial;
        this.states = config.states;
        this.history = [config.initial];
        this.historyCounter = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.current;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        var exception = 0;
        for (var keys in this.states) {
            if (keys == state){
                this.current = state;
				this.history[this.historyCounter + 1] = state;
                this.historyCounter++;
                exception = 1;
                break;
            }
        }
        if (exception == 0){
            throw new exception("An exception occurs: Incorrent input data");
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var exception = 0;
        for (var keys in this.states) {
            if (keys == this.current){
                var input = this.states[keys].transitions;
                break;
            }
        }

        for (keys in input){
            if (keys == event){
                this.current = input[keys];
                this.history[this.historyCounter + 1] = input[keys];
                this.historyCounter++;

                this.history.length = this.historyCounter + 1;
                exception = 1;
                break;
            }
        }

        if (exception == 0){
            throw new exception("An exception occurs: Incorrent input data");
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.current = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arrayOfStates = [];
        var exception = 0;

        if (event) {
            for (var keys in this.states) {
                var input = this.states[keys].transitions;
                var tempData = Object.keys(input);
                
                for (var i = 0; i < tempData.length; i++){
                    if (tempData[i] == event){
                        arrayOfStates[arrayOfStates.length] = keys;
                    }
                }          
            }
        }else{
            arrayOfStates = Object.keys(this.states);
        }

        return arrayOfStates;

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history[this.historyCounter - 1]){
            this.current = this.history[this.historyCounter - 1];
            this.historyCounter--;
            return true;
        }else{
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.history[this.historyCounter + 1]){
            this.current = this.history[this.historyCounter + 1];
            this.historyCounter++;
            return true;
        }else{
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.length = 1;
        this.history[0] = this.current;
        this.historyCounter = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/