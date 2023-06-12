import { ControlledDeviceVm } from '@smart-home/shared/scene/util-scene-vm';

export interface GroupedDevices<T> {
  readonly room: { readonly id: string; readonly name: string };
  readonly devices: T[];
}

export const groupDevicesByRoom = (
  devices: ControlledDeviceVm[]
): GroupedDevices<ControlledDeviceVm>[] => {
  return devices.reduce(
    (
      grouped: GroupedDevices<ControlledDeviceVm>[],
      device: ControlledDeviceVm
    ): GroupedDevices<ControlledDeviceVm>[] => {
      const index = grouped.findIndex(
        (group) => group.room.id === device.roomId
      );
      if (index === -1)
        return [
          ...grouped,
          {
            room: { id: device.roomId, name: device.roomName },
            devices: [device],
          },
        ];
      else
        return grouped.map((group, i) =>
          i === index
            ? { room: { ...group.room }, devices: [...group.devices, device] }
            : group
        );
    },
    []
  );
};
