import React, { Component } from "react";
import { Transition, animated } from "react-spring";

import { Route } from "./routes/Route";
import { routes } from "./routes";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // routeId: "route1",
      rootStack: true,
      stack: [["route1"]]
      // items: ["item2", "item3"]
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     items: ["item1", "item2", "item3"]
    //   });
    // }, 1000);
    // setTimeout(() => {
    //   this.setState({
    //     items: ["item1", "item2", "item3", "item4"]
    //   });
    // }, 2000);
    // setTimeout(() => {
    //   this.setState({
    //     items: ["item4"]
    //   });
    // }, 3000);
  }

  pushRouteToCurrentStack = (routeId, isNewStack) => {
    if (isNewStack) {
      let newLastStack = [routeId];
      this.setState({
        stack: [...this.state.stack, [...newLastStack]],
        closeStack: false,
        newStack: true
        // routeId,
      });
    } else {
      let newLastStack;
      newLastStack = this.state.stack[this.state.stack.length - 1].slice(0);
      newLastStack.push(routeId);

      this.setState({
        stack: [
          ...this.state.stack.slice(0, this.state.stack.length - 1),
          [...newLastStack]
        ],
        closeStack: false,
        newStack: false,
        goBack: false,
        // routeId,
      });
    }
  };

  onCloseStack = () => {
    // const [...head, tail] = this.state.stack;
    const topStackTrimmed = this.state.stack.slice(
      0,
      this.state.stack.length - 1
    );
    // const topStack = this.state.stack[this.state.stack.length - 1];
    // const lastScreenOfTopStack = topStack[topStack.length - 1];
    // topStackTrimmed[topStackTrimmed.length - 1].push(lastScreenOfTopStack);
    this.setState({
      stack: topStackTrimmed,
      closeStack: true,
    });
  };

  onGoBack = () => {
    const removeLastScreen = [...this.state.stack];
    removeLastScreen[removeLastScreen.length - 1] = removeLastScreen[
      removeLastScreen.length - 1
    ].slice(0, removeLastScreen[removeLastScreen.length - 1].length - 1);
    console.log("_____ removeLastScreen", this.state.stack, removeLastScreen);
    this.setState({
      stack: removeLastScreen,
      goBack: true
    });
  };

  render() {
    console.log(
      "_____ this.state.stack",
      this.state.stack,
      this.state.stack[this.state.stack.length - 1]
    );
    const styleForward = {
      from: { opacity: 1, transform: 'translateX(100%)' },
      enter: { opacity: 1, transform: 'translateX(0px)' },
      leave: { opacity: 1, transform: 'translateX(0px)' }
    };
    const styleBackward = {
      from: { opacity: 1, left: 0 },
      enter: { opacity: 1, left: 0 },
      leave: { opacity: 1, left: 400 }
    };
    const styleForwardTitle = {
      from: { opacity: 0, left: 200 },
      enter: { opacity: 1, left: 0 },
      leave: { opacity: 0, left: 0 }
    };
    const styleBackwardTitle = {
      from: { opacity: 0, left: -10 },
      enter: { opacity: 1, left: 0 },
      leave: { opacity: 0, left: 50 }
    };
    const styleCloseStack = {
      from: { opacity: 1, top: 50 },
      enter: { opacity: 1, top: 50 },
      leave: { opacity: 0, top: 400 }
    };
    const styleNewStack = {
      from: { opacity: 1, top: 400 },
      enter: { opacity: 1, top: 50 },
      leave: { opacity: 0, top: 50 }
    };
    const { routeId, closeStack, newStack, goBack } = this.state;
    const st = closeStack
      ? styleCloseStack
      : newStack ? styleNewStack : goBack ? styleBackward : styleForward;
    const stTitle = closeStack
      ? styleCloseStack
      : newStack
        ? styleNewStack
        : goBack ? styleBackwardTitle : styleForwardTitle;
    const keys = this.state.stack[this.state.stack.length - 1].map((r, i) => ({
      r,
      i
    }));
    const keysToRender = [keys[keys.length - 1]];
    return (
      <div className="App">
        <button onClick={() => this.pushRouteToCurrentStack("route1")}>
          route1
        </button>
        <button onClick={() => this.pushRouteToCurrentStack("route2")}>
          route2
        </button>
        <button onClick={() => this.pushRouteToCurrentStack("route3")}>
          route3
        </button>

        <div />

        <button onClick={() => this.pushRouteToCurrentStack("route1", true)}>
          route1 s
        </button>
        <button onClick={() => this.pushRouteToCurrentStack("route2", true)}>
          route2 s
        </button>
        <button onClick={() => this.pushRouteToCurrentStack("route3", true)}>
          route3 s
        </button>

        <Transition
          native
          keys={keysToRender.map(
            stackRoute => `${stackRoute.r}-${stackRoute.i}`
          )}
          {...stTitle}
        >
          {keysToRender.map(stackRoute => styles => (
            <animated.div
              style={{
                backgroundColor: "white",
                position: "absolute",
                top: 50,
                textAlign: 'center',
                // bottom: 20,
                left: 0,
                right: 0,
                zIndex: stackRoute.i,
                // zIndex: routes[stackRoute].zIndex,
                ...styles
              }}
              key={`${stackRoute.r}-${stackRoute.i}`}
            >
              {stackRoute.i !== 0 && <span onClick={this.onGoBack}> &lt; </span>}
              {stackRoute.r}
            </animated.div>
          ))}
        </Transition>

        <Transition
          config={{ tension: 210, friction: 20 }}
          native
          keys={keysToRender.map(
            stackRoute => `${stackRoute.r}-${stackRoute.i}`
          )}
          {...st}
        >
          {keysToRender.map(stackRoute => styles => (
            <animated.div
              style={{
                backgroundColor: 'white',
                boxShadow: '-7px 0px 24px -8px rgba(0,0,0,0.75)',
                position: "absolute",
                top: 100,
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: stackRoute.i,
                transform: 'translateZ(0)',
                // zIndex: routes[stackRoute].zIndex,
                ...styles
              }}
              key={`${stackRoute.r}-${stackRoute.i}`}
            >
              <Route
                routeId={stackRoute.r}
                onRouteChange={this.onRouteChange}
                onCloseStack={this.onCloseStack}
              />
            </animated.div>
          ))}
        </Transition>
      </div>
    );
  }
}

export default App;
