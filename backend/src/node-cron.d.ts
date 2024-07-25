declare module 'node-cron' {
    interface ScheduledTask {
      start: () => void;
      stop: () => void;
      destroy: () => void;
    }
  
    interface ScheduleOptions {
      scheduled?: boolean;
      timezone?: string;
    }
  
    function schedule(
      cronExpression: string,
      func: () => void,
      options?: ScheduleOptions
    ): ScheduledTask;
  
    export { schedule, ScheduledTask, ScheduleOptions };
  }
  