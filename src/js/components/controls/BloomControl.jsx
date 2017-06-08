import React from 'react';

import UIComponent from '../UIComponent';
import NumberInput from '../inputs/NumberInput';
import RangeInput from '../inputs/RangeInput';
import SelectInput from '../inputs/SelectInput';
import { Control, Row } from './Control';

const blendModes = [
    'Add',
    'Screen'
];

export default class BloomControl extends UIComponent {
    constructor(props) {
        super(props);

        this.state = this.props.display.options;
    }

    onChange(name, val) {
        let obj = {},
            display = this.props.display;

        obj[name] = val;

        this.setState(obj, () => {
            display.update(obj);
        });
    }

    render() {
        return (
            <Control label="BLOOM" className={this.props.className}>
                <Row label="Blend Mode">
                    <SelectInput
                        name="blendMode"
                        width={140}
                        items={blendModes}
                        value={this.state.blendMode}
                        onChange={this.onChange}
                    />
                </Row>
                <Row label="Amount">
                    <NumberInput
                        name="amount"
                        width={40}
                        value={this.state.amount}
                        min={0}
                        max={1.0}
                        step={0.01}
                        onChange={this.onChange}
                    />
                    <div className="input flex">
                        <RangeInput
                            name="amount"
                            min={0}
                            max={1.0}
                            step={0.01}
                            value={this.state.amount}
                            onChange={this.onChange}
                        />
                    </div>
                </Row>
                <Row label="Threshold">
                    <NumberInput
                        name="threshold"
                        width={40}
                        value={this.state.threshold}
                        min={0}
                        max={1.0}
                        step={0.01}
                        onChange={this.onChange}
                    />
                    <div className="input flex">
                        <RangeInput
                            name="threshold"
                            min={0}
                            max={1.0}
                            step={0.01}
                            value={this.state.threshold}
                            onChange={this.onChange}
                        />
                    </div>
                </Row>
            </Control>
        );
    }
}