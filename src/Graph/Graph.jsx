import React, { useEffect, useMemo, useState } from "react";
import ReactFlow from "react-flow-renderer";
import createGraphObj from "./CreateGraphObj";
import "react-flow-renderer/dist/style.css";
import "./Graph.style.css";
import dagre from "dagre";

const Graph = ({ heroes = [], setShowGraph, showGraph }) => {
  const [hero, setHero] = useState({});

  useEffect(() => {
    const chosenHero = (element) => element.id.toString() === showGraph.id;
    const fetchHero = async () => {
      const result = await createGraphObj(heroes.find(chosenHero));
      setHero(result);
    };
    fetchHero();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [heroes, showGraph.id]);

  console.log(hero);

  const nodes = useMemo(() => {
    if (!hero || !hero.id || !hero.films) return [];

    // Главный узел – герой
    const heroNode = {
      id: hero.id.toString(),
      type: "input", // Тип узла
      data: { label: `${hero.name}` },
      position: { x: 0, y: 0 }, // Начальная позиция будет изменена dagre
      style: {
        background: "#e0de60",
        color: "#000",
        border: "1px solid #222138",
        width: 150,
      },
    };

    // Узлы фильмов
    const filmNodes = hero.films.map((film) => ({
      id: `film-${film.id}`,
      data: { label: film.title },
      position: { x: 0, y: 0 }, // Начальная позиция будет изменена dagre
      style: {
        background: "#79a4c9",
        color: "#000",
        border: "1px solid #222138",
        width: 200,
      },
    }));

    // Узлы космических кораблей
    const spaceshipNodes = hero.films.flatMap((film) =>
      film.spaceships.map((ship) => ({
        id: `ship-${ship.id}`,
        data: { label: ship.name },
        position: { x: 0, y: 0 }, // Начальная позиция будет изменена dagre
        style: {
          background: "#eb7fde",
          color: "#000",
          border: "1px solid #222138",
          width: 150,
        },
      }))
    );

    return [heroNode, ...filmNodes, ...spaceshipNodes];
  }, [hero]);

  const edges = useMemo(() => {
    if (!hero || !hero.id || !hero.films) return [];

    // Связи от героя до фильмов
    const heroToFilms = hero.films.map((film) => ({
      id: `e-${hero.id}-film-${film.id}`,
      source: hero.id.toString(),
      target: `film-${film.id}`,
      animated: true,
      type: "smoothstep",
      style: { stroke: "#FFCC00" },
    }));

    // Связи от фильмов до космических кораблей
    const filmsToShips = hero.films.flatMap((film) =>
      film.spaceships.map((ship) => ({
        id: `e-${film.id}-ship-${ship.id}`,
        source: `film-${film.id}`,
        target: `ship-${ship.id}`,
        animated: true,
        type: "smoothstep",
        style: { stroke: "#00CCFF" },
      }))
    );

    return [...heroToFilms, ...filmsToShips];
  }, [hero]);

  // Получение компоновки узлов и рёбер с помощью dagre
  const layoutedElements = useMemo(() => {
    if (nodes.length === 0) return { nodes: [], edges: [] };
    return getLayoutedElements(nodes, edges);
  }, [nodes, edges]);

  const nodeTypes = {};

  return (
    <div className="graph-container">
      <button
        className="graph-button"
        onClick={() => setShowGraph({ show: false, id: 0 })}
      >
        Back
      </button>
      <p>Graph</p>
      <div style={{ height: 600, width: "100%" }}>
        <ReactFlow
          nodes={layoutedElements.nodes}
          edges={layoutedElements.edges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          fitView
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
  // return <></>;
};

// Функция для компоновки графа с использованием dagre
const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Настройка направления компоновки: 'TB' (сверху вниз), 'LR' (слева направо) и т.д.
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.style.width || 150, height: 50 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - node.style.width / 2,
      y: nodeWithPosition.y - 25, // Центрирование по высоте узла
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

export default Graph;
