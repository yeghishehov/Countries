import React, { Component } from 'react';
import './input.css';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const stylesForInput = {
    root: {
      '& label.Mui-focused': {color: 'green'},
      '& .MuiInput-underline:after': {borderBottomColor: 'green'},
      '& .MuiOutlinedInput-root': {'& fieldset': {borderColor: 'red'},
                                   '&:hover fieldset': {borderColor: 'yellow'},
                                   '&.Mui-focused fieldset': {borderColor: 'green'}
                                   }
    }
};


const StylizedInput = withStyles(stylesForInput)(TextField);



export default class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue : ""
        }
    }

    componentDidMount() {
        this.inputNode.focus();
    }

    onInputChange = event => {
        this.setState({inputValue: event.target.value})
    };

    onEnter = event => {
        if (event.key === "Enter") {
            this.props.onInputClick(this.state.inputValue);
        }
    };

    render() {
        return (
            <div className='main'>
                <StylizedInput
                    id="custom-css-standard-input"
                    label="Country name: "
                    onChange={this.onInputChange}
                    onKeyDown={e => this.onEnter(e)}
                    ref={node => this.inputNode = node}/>
            </div>
        )
    }
}