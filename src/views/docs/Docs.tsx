export default function Docs() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div className="space-y-3 py-6">
        <h1 className="text-3xl tracking-wide">Getting Started</h1>
        <p className="text-xs text-white/60 italic">
          Ready to boost your productivity and achieve your goals? Let's get
          started!
        </p>
        <p className="text-sm text-white/80">
          <span className="text-green-700">Reminder:</span> Habit Tracker and
          Pomodoro feature are locked. You need to Sign up or Login with your
          Google account to get access to said features. You can still use the
          WIGS feature without signing up or logging in but data will be saved
          in memory only and could be lost at any time. Lost data will not be
          able to be recovered.
        </p>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl tracking-wide">WIGS</h1>
        <p className="text-sm text-white/80">
          WIGS is short for Wildly Important Goals. This aims to focus on the 3
          to 4 most important goals you need to finish within the day.
        </p>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl tracking-wide">Habit Tracker</h1>
        <p className="text-sm text-white/80">
          It is said that in order to create a habit you need to do the thing
          you want to build for 63 days. This could help tracking the habits you
          want to build.
        </p>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl tracking-wide">Pomodoro</h1>
        <p className="text-sm text-white/80">
          Pomodoro is a time management technique that uses a timer to break
          down work into intervals, traditionally 25 minutes in length,
          separated by short breaks. Get more done by allowing yourself to be
          distracted.
        </p>
      </div>
    </div>
  );
}
