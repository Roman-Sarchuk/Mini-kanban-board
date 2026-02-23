import { renderHook, act } from "@testing-library/react";
import { useTasks } from "../hooks/useTasks";

describe("useTasks hook", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("init empty array, if localStorage is empty", () => {
    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toEqual([]);
  });

  test("add new task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("column-1", "Test Task");
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe("Test Task");
  });

  test("updates a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("column-1", "Old Title");
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.updateTask(taskId, { title: "New Title" });
    });

    expect(result.current.tasks[0].title).toBe("New Title");
  });

  test("deletes a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("column-1", "Task");
    });

    const taskId = result.current.tasks[0].id;

    act(() => {
      result.current.deleteTask(taskId);
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  test("moves a task to another position and column", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("column-1", "Task 1");
      result.current.addTask("column-1", "Task 2");
      result.current.addTask("column-2", "Task 3");
    });

    const firstId = result.current.tasks[0].id;
    const secondId = result.current.tasks[1].id;
    const thirdId = result.current.tasks[2].id;

    act(() => {
      result.current.moveTask(firstId, secondId, "column-1");
    });

    expect(result.current.tasks[0].id).toBe(secondId);

    act(() => {
      result.current.moveTask(secondId, thirdId, "column-2");
    });

    expect(result.current.tasks.find((t) => t.id === secondId)?.columnId).toBe(
      "column-2",
    );
  });

  test("move task via update task columnId", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("column-1", "Task 1");
    });

    const firstId = result.current.tasks[0].id;
    const secondId = result.current.tasks[1].id;

    act(() => {
      result.current.updateTask(firstId, { columnId: "column-2" });
    });

    expect(result.current.tasks[0].columnId).toBe("column-2");
  });

  test("saves tasks to localStorage when tasks change", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("column-1", "Task");
    });

    const savedValues = JSON.parse(setItemSpy.mock.calls[0][1]);
    expect(savedValues).toHaveLength(1);
  });
});
