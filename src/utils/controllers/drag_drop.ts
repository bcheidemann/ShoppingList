export type DropEventHandler<DragData, DropData> = (
  dragData: DragData,
  dropData: DropData,
) => void;

export class DragDropController<DragData, DropData> {
  private eventHandlers = {
    drop: new Array<DropEventHandler<DragData, DropData>>(),
  };
  private dragData: DragData | null = null;

  private handleDrop(dropData: DropData) {
    this.eventHandlers.drop.forEach((handler) => {
      handler(this.dragData as DragData, dropData);
    });
    this.dragData = null;
  }

  public createOnDragStartHandler<T extends EventTarget>(
    dragData: DragData,
  ): svelte.JSX.DragEventHandler<T> {
    return () => {
      this.dragData = dragData;
    };
  }

  public createOnDropHandler<T extends EventTarget>(
    dropData: DropData,
  ): svelte.JSX.DragEventHandler<T> {
    return () => {
      this.handleDrop(dropData);
    };
  }

  public onDragOverAllowDrop: svelte.JSX.DragEventHandler<EventTarget> = (
    e,
  ) => {
    e.preventDefault();
  };

  public addDropEventListener(handler: DropEventHandler<DragData, DropData>) {
    if (!this.eventHandlers.drop.includes(handler)) {
      this.eventHandlers.drop.push(handler);
    }

    return () => {
      this.removeDropEventListener(handler);
    };
  }

  public removeDropEventListener(
    handler: DropEventHandler<DragData, DropData>,
  ) {
    this.eventHandlers.drop = this.eventHandlers.drop.filter((h) =>
      h !== handler
    );
  }
}
