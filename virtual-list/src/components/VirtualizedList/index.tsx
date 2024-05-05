import React, { useEffect, useRef, useState } from "react";

type VirtualizedListProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    itemHeight: number;
    containerHeight: number;
}

export const VirtualizedList = <T,>({ items, renderItem, itemHeight, containerHeight }: VirtualizedListProps<T>) => {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(Math.ceil(containerHeight / itemHeight));
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!containerRef.current) return;

        const handleScroll = () => {
            if(!containerRef.current) return;
            const scrollTop = containerRef.current.scrollTop;
            const newStartIndex = Math.floor(scrollTop / itemHeight);
            setStartIndex(newStartIndex);
            setEndIndex(Math.min(newStartIndex + Math.ceil(containerHeight / itemHeight), items.length));
        };

        containerRef.current.addEventListener('scroll', handleScroll);

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [items.length, containerHeight, itemHeight]);

    const visibleItems = items.slice(startIndex, endIndex);

    return (
        <div
            ref={containerRef}
            style={{ height: containerHeight, overflowY: 'auto' }}
        >
            <ul style={{ height: items.length * itemHeight, position: 'relative' }}>
                {visibleItems.map((item, index) => (
                    <li key={startIndex + index}
                         style={{ position: 'absolute', top: (startIndex + index) * itemHeight }}>
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

