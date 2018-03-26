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
        newStack: false
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
      closeStack: true
    });
  };

  render() {
    console.log(
      "_____ this.state.stack",
      this.state.stack,
      this.state.stack[this.state.stack.length - 1]
    );
    const styleForward = {
      from: { opacity: 1, left: 400 },
      enter: { opacity: 1, left: 0 },
      leave: { opacity: 1, left: 0 }
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
    const { routeId, closeStack, newStack } = this.state;
    const st = closeStack
      ? styleCloseStack
      : newStack ? styleNewStack : styleForward;
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
          config={{ tension: 210, friction: 20 }}
          keys={keysToRender.map(
            stackRoute => `${stackRoute.r}-${stackRoute.i}`
          )}
          {...st}
        >
          {keysToRender.map(stackRoute => styles => (
            <animated.div
              style={{
                backgroundColor: routes[stackRoute.r].bgColor,
                position: "absolute",
                top: 50,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: stackRoute.i,
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
