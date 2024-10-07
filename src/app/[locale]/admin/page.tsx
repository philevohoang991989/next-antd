'use client'
import { Button } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

export default function AdminPage() {
    const [count, setCount] = useState(() => {
        console.log("useState");
        return 0;
      });
      const refCount = useRef(count);
    
      useEffect(() => {
        console.log("useEffect");
        return () => {
          console.log("useEffect cleanup");
        };
      }, []);
    
      useEffect(() => {
        console.log("useEffect count");
        return () => {
          console.log("useEffect cleanup count");
        };
      }, [count]);
    
      const increment = () => {
        setCount((count) => count + 1);
      };
    
      const incrementRef = () => {
        refCount.current += 1;
      };
    
      const memoizedValue = useMemo(() => {
        console.log("useMemo");
        return count * 2;
      }, [count]);
    
      return (
        <div className="App">
          <>{console.log("render")}</>
          <header className="App-header">
            <p>{count}</p>
            <p>{memoizedValue}</p>
            <p>{refCount.current}</p>
            <Button onClick={increment}>Increment</Button>
            <Button onClick={incrementRef}>Increment Ref</Button>
          </header>
        </div>
      );
}