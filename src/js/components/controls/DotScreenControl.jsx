import React from 'react';

import UIComponent from '../UIComponent';
import NumberInput from '../inputs/NumberInput';
import RangeInput from '../inputs/RangeInput';
import { Control, Row } from './Control';

export default class DotScreenControl extends UIComponent {
    constructor(props) {
        super(props);

        this.state = this.props.display.options;
    }

    onChange(name, val) {
        let obj = {},
            display = this.props.display;

        obj[name] = val;
        
        this.setState(obj, () => {
            display.update(this.state);
        });
    }

    render() {
        return (
            <Control label="DOT SCREEN" className={this.props.className}>
                <Row label="Amount">
                    <NumberInput
                        name="scale"
                        width={40}
                        value={this.state.scale}
                        min={0}
                        max={2.0}
                        step={0.01}
                        onChange={this.onChange}
                    />
                    <div className="input flex">
                        <RangeInput
                            name="scale"
                            min={0.0}
                            max={2.0}
                            step={0.01}
                            value={this.state.scale}
                            onChange={this.onChange}
                        />
                    </div>
                </Row>
                <Row label="Angle">
                    <NumberInput
                        name="angle"
                        width={40}
                        value={this.state.angle}
                        min={0}
                        max={360}
                        onChange={this.onChange}
                    />
                    <div className="input flex">
                        <RangeInput
                            name="angle"
                            min={0}
                            max={360}
                            value={this.state.angle}
                            onChange={this.onChange}
                        />
                    </div>
                </Row>
            </Control>
        );
    }
}