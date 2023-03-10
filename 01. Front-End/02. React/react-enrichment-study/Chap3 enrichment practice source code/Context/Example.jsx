import React, { Component } from 'react'
import { themes } from './App';
import ThemeContext from './ThemeContext';
import ThemedButton from './ThemedButton';

export default class Example extends Component {
    constrctor(props) {
        super(props);
        this.state = {
            theme: themes.light,
        };

        this.toggleTheme = () => {
            this.setState((prev) => ({
                theme: prev.theme === themes.dart ? themes.light : themes.dark,
            }))
        }
    }
    render() {
        return (
            <div>
                <ThemeContext.Provider value={this.state.theme}>
                    <ThemedButton changeTheme={this.toggleTheme}/>
                    <ThemeContext.Consumer>
                        {theme => (<div style={{width: 300, height: 300, backgroundColor: theme.background}}>                            
                        </div>
                        )}
                    </ThemeContext.Consumer>
                </ThemeContext.Provider>
                <ThemedButton />
            </div>
        )
    }
}
