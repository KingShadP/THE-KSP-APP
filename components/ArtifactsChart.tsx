'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const DATA = [
  { id: 'VAULT-001', name: 'OBSIDIAN MANTLE', limit: 50, produced: 12 },
  { id: 'VAULT-002', name: 'THE PRIME CREST', limit: 25, produced: 8 },
  { id: 'VAULT-003', name: 'THE PORTAL TRENCH', limit: 15, produced: 15 },
];

export function ArtifactsChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState(DATA);
  const [isAuditing, setIsAuditing] = useState(false);
  const [width, setWidth] = useState(800);

  // Responsive container observer
  useEffect(() => {
    if (!chartRef.current) return;
    const container = chartRef.current;
    
    // Set initial size
    setWidth(container.clientWidth || 800);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const container = chartRef.current;
    
    const height = 300;
    const margin = { top: 30, right: 20, bottom: 40, left: 50 };

    // Find or append SVG elements
    let svg = d3.select(container).select<SVGSVGElement>("svg");
    if (svg.empty()) {
      svg = d3.select(container)
        .append("svg")
        .attr("class", "artifacts-svg")
        .attr("width", "100%")
        .attr("height", height);
    }
    
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // Create defs if they do not exist
    const defs = svg.select("defs");
    if (defs.empty()) {
      const newDefs = svg.append("defs");
      
      const maxGradient = newDefs.append("linearGradient")
        .attr("id", "max-grad")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%");
      maxGradient.append("stop").attr("offset", "0%").attr("stop-color", "#E5E4E2").attr("stop-opacity", 0.08);
      maxGradient.append("stop").attr("offset", "100%").attr("stop-color", "#E5E4E2").attr("stop-opacity", 0.0);

      const producedGradient = newDefs.append("linearGradient")
        .attr("id", "prod-grad")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "0%").attr("y2", "100%");
      producedGradient.append("stop").attr("offset", "0%").attr("stop-color", "#93000a").attr("stop-opacity", 0.7);
      producedGradient.append("stop").attr("offset", "100%").attr("stop-color", "#5E0008").attr("stop-opacity", 0.3);
    }

    // Determine Y max domain procedurally based on current max limit/produced
    const maxVal = d3.max(chartData, d => Math.max(d.limit, d.produced)) || 50;
    const yMax = Math.ceil(maxVal / 10) * 10; // Round up to nice multiple of 10

    // Set up Scales
    const x = d3.scaleBand()
      .domain(chartData.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const y = d3.scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    // Ensure chart structural groups exist
    let xAxisGroup = svg.select<SVGGElement>("g.x-axis");
    if (xAxisGroup.empty()) {
      xAxisGroup = svg.append("g").attr("class", "x-axis");
    }
    
    let yAxisGroup = svg.select<SVGGElement>("g.y-axis");
    if (yAxisGroup.empty()) {
      yAxisGroup = svg.append("g").attr("class", "y-axis");
    }

    let gridLinesGroup = svg.select<SVGGElement>("g.grid-lines");
    if (gridLinesGroup.empty()) {
      gridLinesGroup = svg.append("g").attr("class", "grid-lines");
    }

    let limitBarsGroup = svg.select<SVGGElement>("g.limit-bars");
    if (limitBarsGroup.empty()) {
      limitBarsGroup = svg.append("g").attr("class", "limit-bars");
    }

    let producedBarsGroup = svg.select<SVGGElement>("g.produced-bars");
    if (producedBarsGroup.empty()) {
      producedBarsGroup = svg.append("g").attr("class", "produced-bars");
    }

    let labelsGroup = svg.select<SVGGElement>("g.labels");
    if (labelsGroup.empty()) {
      labelsGroup = svg.append("g").attr("class", "labels");
    }

    // --- Transitions ---
    const t = d3.transition().duration(1000).ease(d3.easeCubicInOut);

    // 1. Draw X Axis with transition
    xAxisGroup
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .transition(t)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .on("end", () => {
        xAxisGroup.select(".domain").attr("stroke", "rgba(229, 228, 226, 0.1)");
        xAxisGroup.selectAll("text")
          .attr("fill", "rgba(229, 228, 226, 0.4)")
          .attr("font-family", "monospace")
          .attr("font-size", "9px")
          .attr("letter-spacing", "0.1em");
      });
    
    xAxisGroup.select(".domain").attr("stroke", "rgba(229, 228, 226, 0.1)");
    xAxisGroup.selectAll("text")
      .attr("fill", "rgba(229, 228, 226, 0.4)")
      .attr("font-family", "monospace")
      .attr("font-size", "9px")
      .attr("letter-spacing", "0.1em");

    // 2. Draw Y Axis with transition for scale adjustments
    yAxisGroup
      .attr("transform", `translate(${margin.left},0)`)
      .transition(t)
      .call(d3.axisLeft(y).ticks(4).tickSizeOuter(0))
      .on("end", () => {
        yAxisGroup.select(".domain").attr("stroke", "rgba(229, 228, 226, 0.1)");
        yAxisGroup.selectAll("line").attr("stroke", "rgba(229, 228, 226, 0.05)");
        yAxisGroup.selectAll("text")
          .attr("fill", "rgba(229, 228, 226, 0.4)")
          .attr("font-family", "monospace")
          .attr("font-size", "9px");
      });

    yAxisGroup.select(".domain").attr("stroke", "rgba(229, 228, 226, 0.1)");
    yAxisGroup.selectAll("line").attr("stroke", "rgba(229, 228, 226, 0.05)");
    yAxisGroup.selectAll("text")
      .attr("fill", "rgba(229, 228, 226, 0.4)")
      .attr("font-family", "monospace")
      .attr("font-size", "9px");

    // 3. Grid lines transition
    const ticks = y.ticks(4);
    gridLinesGroup.selectAll("line")
      .data(ticks)
      .join(
        enter => enter.append("line")
          .attr("stroke", "rgba(229, 228, 226, 0.05)")
          .attr("stroke-dasharray", "2,2")
          .attr("x1", margin.left)
          .attr("x2", width - margin.right)
          .attr("y1", d => y(d))
          .attr("y2", d => y(d)),
        update => update,
        exit => exit.remove()
      )
      .transition(t)
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d));

    // 4. Limit Bars (Background) with smooth transition of width, x, y, and height
    limitBarsGroup.selectAll<SVGRectElement, typeof chartData[number]>("rect")
      .data(chartData, d => d.id)
      .join(
        enter => enter.append("rect")
          .attr("x", d => x(d.name)!)
          .attr("y", y(0))
          .attr("height", 0)
          .attr("width", x.bandwidth())
          .attr("fill", "url(#max-grad)")
          .attr("stroke", "rgba(229, 228, 226, 0.15)")
          .attr("stroke-width", 1),
        update => update,
        exit => exit.remove()
      )
      .transition(t)
      .attr("x", d => x(d.name)!)
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.limit))
      .attr("height", d => y(0) - y(d.limit));

    // 5. Produced Bars (Foreground) with height transition
    producedBarsGroup.selectAll<SVGRectElement, typeof chartData[number]>("rect")
      .data(chartData, d => d.id)
      .join(
        enter => enter.append("rect")
          .attr("x", d => x(d.name)!)
          .attr("y", y(0))
          .attr("height", 0)
          .attr("width", x.bandwidth())
          .attr("fill", "url(#prod-grad)")
          .attr("stroke", "#93000a")
          .attr("stroke-width", 1),
        update => update,
        exit => exit.remove()
      )
      .transition(t)
      .attr("x", d => x(d.name)!)
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.produced))
      .attr("height", d => y(0) - y(d.produced));

    // 6. Labels repositioning and text text interpolation
    labelsGroup.selectAll<SVGTextElement, typeof chartData[number]>("text")
      .data(chartData, d => d.id)
      .join(
        enter => enter.append("text")
          .attr("x", d => (x(d.name) || 0) + x.bandwidth() / 2)
          .attr("y", y(0))
          .attr("text-anchor", "middle")
          .attr("fill", "#dcc57b")
          .attr("font-family", "monospace")
          .attr("font-size", "9px")
          .attr("letter-spacing", "0.2em")
          .style("opacity", 0)
          .text(d => `${d.produced}/${d.limit} MINTED`),
        update => update,
        exit => exit.remove()
      )
      .transition(t)
      .attr("x", d => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.produced) - 10)
      .style("opacity", 1)
      .text(d => `${d.produced}/${d.limit} MINTED`);

  }, [chartData, width]);

  const handleSimulateUpdate = () => {
    setIsAuditing(true);
    
    // Simulate archival lookup calculation latency
    setTimeout(() => {
      setChartData(prev => 
        prev.map(item => {
          // Calculate an animated random trajectory increment/decrement
          const delta = Math.random() > 0.5 ? 1 : -1;
          const shift = Math.floor(Math.random() * 5 + 1) * delta;
          const newProduced = Math.max(2, Math.min(item.limit, item.produced + shift));
          
          // Introduce a direct, clean change to the limit visual constraint to force full scale recalculations
          const limitDelta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 10 : -10) : 0;
          const newLimit = Math.max(newProduced + 5, Math.min(120, item.limit + limitDelta));
          
          return {
            ...item,
            limit: newLimit,
            produced: newProduced
          };
        })
      );
      setIsAuditing(false);
    }, 850);
  };

  return (
    <div className="w-full mt-24 mb-12 border border-[#E5E4E2]/10 bg-[#0a0a0a]/50 p-8 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#93000a]" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#93000a]" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#93000a]" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#93000a]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <span className="w-1.5 h-1.5 bg-[#dcc57b] rounded-none animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#dcc57b]">Scarcity Matrix Ledger</span>
        </div>
        
        <button
          onClick={handleSimulateUpdate}
          disabled={isAuditing}
          data-cursor="pointer"
          className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-[#E5E4E2]/60 hover:text-[#dcc57b] border border-[#E5E4E2]/10 hover:border-[#dcc57b]/30 bg-[#050505]/40 px-5 py-2.5 transition-all duration-500 cursor-none disabled:opacity-40 disabled:pointer-events-none"
        >
          {isAuditing ? '[ AUDITING CRYPGRAPHIC SYSTEM... ]' : '[ RUN LIVE LEDGER AUDIT ]'}
        </button>
      </div>

      <div ref={chartRef} className="w-full h-[300px]" />
    </div>
  );
}
