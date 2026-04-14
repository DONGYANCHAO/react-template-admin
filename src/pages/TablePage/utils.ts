export const waitTimePromise = async (time: number = 100): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100): Promise<void> => {
  await waitTimePromise(time);
};
