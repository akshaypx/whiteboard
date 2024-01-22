"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { useDraw } from "@/hooks/useDraw";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { CircleDot, Palette, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

type Props = {};

const Home = (props: Props) => {
  const [color, setColor] = useState<string>("#aabbcc");
  const [lineWidth, setLineWidth] = useState<number>(5);
  const { height, width } = useWindowDimensions();

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center">
      {width && height ? (
        <>
          <div className="flex flex-col gap-10 pr-2">
            <ModeToggle />
            <Popover>
              <PopoverTrigger className="border border-bg-primary-foreground rounded-md p-2 w-fit">
                <Palette size={20} />
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <HexColorPicker color={color} onChange={setColor} />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger className="border border-bg-primary-foreground rounded-md p-2 w-fit">
                <CircleDot size={20} />
              </PopoverTrigger>
              <PopoverContent>
                <Slider
                  onValueChange={(e) => setLineWidth(e[0])}
                  defaultValue={[lineWidth]}
                  max={10}
                  step={1}
                  min={5}
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" className="px-1" onClick={clear}>
              <Trash2 size={20} />
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <canvas
              onMouseDown={onMouseDown}
              ref={canvasRef}
              width={width - width * 0.1}
              height={height - height * 0.1}
              className="border border-bg-primary-foreground rounded-md"
            />
            <p className="text-sm text-muted-foreground py-1">
              Made by{" "}
              <Link href="https://github.com/akshaypx" target="_blank">
                Akshay Srivastava
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>Loading Board...</>
      )}
    </div>
  );
};

export default Home;
