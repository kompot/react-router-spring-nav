import React from "react";

import "./Route.css";
import { routes } from "./index";

export class Route extends React.Component {
  closeStack = routeId => {
    this.props.onCloseStack();
  };
  render() {
    const { routeId } = this.props;
    // style={{ backgroundColor: routes[routeId].bgColor }}
    return (
      <div
        className="Route"
        style={{ backgroundColor: routes[routeId].bgColor }}
      >
          {routeId} {routeId} {routeId} {routeId} {routeId} {routeId} {routeId}
        <p>{routes[routeId].title}</p>
        <p>{routes[routeId].title}</p>
        <p>{routes[routeId].title}</p>
        <p>{routes[routeId].title}</p>
        <p>{routes[routeId].title}</p>
        <button onClick={this.closeStack}>
          close stack
        </button>
        {/* <ul>
          <li onClick={() => this.changeRoute("route1")}>route1</li>
          <li onClick={() => this.changeRoute("route2")}>route2</li>
          <li onClick={() => this.changeRoute("route3")}>route3</li>
        </ul>  */}
      </div>
    );
  }
}
