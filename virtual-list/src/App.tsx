import { VirtualizedList } from "./components/VirtualizedList";

// Usage
const App = () => {
    const items = Array.from({ length: 1000 }, (_, i) => i);
    const renderItem = (item: number) => <div style={{ height: 60 }}>Элемент {item}</div>;

    return (
        <VirtualizedList
            items={items}
            renderItem={renderItem}
            itemHeight={60}
            containerHeight={260}
        />
    );
};

export default App;
