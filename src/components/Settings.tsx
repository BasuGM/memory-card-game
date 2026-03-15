'use client';

import { useGameSettings } from '../contexts/GameSettingsContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Settings as SettingsIcon, Volume2, VolumeX, Zap } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const { settings, toggleAudio, toggleAnimations } = useGameSettings();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-none"
        >
          <SettingsIcon className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Audio Settings */}
          <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="flex items-center gap-3">
              {settings.audioEnabled ? (
                <Volume2 className="h-5 w-5 text-blue-500" />
              ) : (
                <VolumeX className="h-5 w-5 text-zinc-400" />
              )}
              <div>
                <p className="font-semibold text-black dark:text-white">
                  Sound Effects
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {settings.audioEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleAudio}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.audioEnabled
                  ? 'bg-blue-500'
                  : 'bg-zinc-300 dark:bg-zinc-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.audioEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Animation Settings */}
          <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-semibold text-black dark:text-white">
                  Animations
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {settings.animationsEnabled ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleAnimations}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.animationsEnabled
                  ? 'bg-blue-500'
                  : 'bg-zinc-300 dark:bg-zinc-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Info Section */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 Settings are automatically saved to your device.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
