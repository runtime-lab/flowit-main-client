'use client';

import { useCallback, useEffect, useRef } from 'react';

import { KanbanColumn } from './kanban-column';

import { BOARD_COLUMNS } from '../model';

import type { Task, TaskStatus } from '@entities/task';

type ScrollSnapshot = {
    boardScrollLeft: number;
    columnScrollTops: number[];
    mainScrollTop: number;
};

type KanbanBoardProps = {
    tasks: Task[];
    onTaskStatusChange: (taskId: number, status: TaskStatus) => void;
    onTaskClick?: (task: Task) => void;
    onAddTask?: (status: TaskStatus) => void;
};

export function KanbanBoard({ tasks, onTaskStatusChange, onTaskClick, onAddTask }: KanbanBoardProps) {
    const boardRef = useRef<HTMLDivElement>(null);
    const scrollSnapshotRef = useRef<ScrollSnapshot | null>(null);

    const captureScrollPositions = useCallback(() => {
        const board = boardRef.current;
        if (!board) {
            return;
        }

        const main = board.closest('main');

        scrollSnapshotRef.current = {
            boardScrollLeft: board.scrollLeft,
            columnScrollTops: Array.from(board.querySelectorAll('[data-kanban-column-scroll]')).map(
                element => (element as HTMLElement).scrollTop,
            ),
            mainScrollTop: main instanceof HTMLElement ? main.scrollTop : 0,
        };
    }, []);

    const restoreScrollPositions = useCallback(() => {
        const snapshot = scrollSnapshotRef.current;
        const board = boardRef.current;
        if (!snapshot || !board) {
            return;
        }

        board.scrollLeft = snapshot.boardScrollLeft;

        board.querySelectorAll('[data-kanban-column-scroll]').forEach((element, index) => {
            (element as HTMLElement).scrollTop = snapshot.columnScrollTops[index] ?? 0;
        });

        const main = board.closest('main');
        if (main instanceof HTMLElement) {
            main.scrollTop = snapshot.mainScrollTop;
        }
    }, []);

    useEffect(() => {
        const handleDragOver = () => {
            restoreScrollPositions();
        };

        const handleDragEnd = () => {
            scrollSnapshotRef.current = null;
        };

        document.addEventListener('dragover', handleDragOver);
        document.addEventListener('dragend', handleDragEnd);

        return () => {
            document.removeEventListener('dragover', handleDragOver);
            document.removeEventListener('dragend', handleDragEnd);
        };
    }, [restoreScrollPositions]);

    const handleTaskDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: number) => {
        captureScrollPositions();
        event.dataTransfer.setData('taskId', String(taskId));
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
        event.preventDefault();
        const taskId = Number(event.dataTransfer.getData('taskId'));
        if (!taskId) {
            return;
        }

        const task = tasks.find(currentTask => currentTask.id === taskId);

        if (!task || task.status === status) {
            return;
        }

        onTaskStatusChange(taskId, status);

        requestAnimationFrame(() => {
            restoreScrollPositions();
        });
    };

    return (
        <div
            ref={boardRef}
            className="flex min-h-0 flex-1 items-stretch gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-2 [overflow-anchor:none]"
        >
            {BOARD_COLUMNS.map(column => (
                <KanbanColumn
                    key={column.id}
                    column={column}
                    tasks={tasks.filter(task => task.status === column.id)}
                    onTaskClick={onTaskClick}
                    onTaskDragStart={handleTaskDragStart}
                    onDrop={handleDrop}
                    onAddTask={() => onAddTask?.(column.id)}
                />
            ))}
        </div>
    );
}
