import { vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useColumns } from "../hooks/useColumns";

describe("useColumns hook", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("add new column", () => {
    const { result } = renderHook(() => useColumns());

    act(() => {
      result.current.addColumn("To Do");
    });

    expect(result.current.columns).toHaveLength(1);
    expect(result.current.columns[0].title).toBe("To Do");
  });

  test("updates a column", () => {
    const { result } = renderHook(() => useColumns());

    act(() => {
      result.current.addColumn("Old");
    });

    const id = result.current.columns[0].id;

    act(() => {
      result.current.updateColumn(id, { title: "New" });
    });

    expect(result.current.columns[0].title).toBe("New");
  });

  test("deletes a column", () => {
    const { result } = renderHook(() => useColumns());

    act(() => {
      result.current.addColumn("To Delete");
    });

    const id = result.current.columns[0].id;

    act(() => {
      result.current.deleteColumn(id);
    });

    expect(result.current.columns).toHaveLength(0);
  });

  test("move a column to another position", () => {
    const { result } = renderHook(() => useColumns());

    act(() => {
      result.current.addColumn("Column 1");
      result.current.addColumn("Column 2");
    });

    const firstId = result.current.columns[0].id;
    const secondId = result.current.columns[1].id;

    act(() => {
      result.current.moveColumn(firstId, secondId);
    });

    expect(result.current.columns[0].id).toBe(secondId);
  });

  test("saves columns to localStorage", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() => useColumns());

    await act(async () => {
      result.current.addColumn("New Column");
    });

    expect(setItemSpy).toHaveBeenCalled();

    // Знаходимо саме той виклик що зберігає columns (не початковий)
    const calls = setItemSpy.mock.calls.filter(
      ([key]) => key === "my-kanban-columns",
    );
    const saved = JSON.parse(calls[calls.length - 1][1]);
    expect(saved).toHaveLength(1);
  });
});
