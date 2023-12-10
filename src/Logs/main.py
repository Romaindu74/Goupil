import os
from datetime import datetime

class Colors:
    def __init__(self) -> None:
        self.enable = True if (os.name == 'posix' and 'TERM' in os.environ and os.environ['TERM'] != 'dumb') or (os.name == 'nt' and os.environ.get('TERM_PROGRAM') == 'vscode') else False

    def init(self, x: int, y: int, txt: str) -> str:
        rgx = '\x1b[{}m'.format(y)
        open_code = '\x1b[{}m'.format(x)
        close_code = '\x1b[{}m'.format(y)
        return open_code + (txt.replace(rgx, close_code + open_code) if txt and rgx in txt else txt) + close_code if txt else txt

    def black(self, txt: str) -> str:
        return self.init(30, 39, txt)

    def red(self, txt: str) -> str:
        return self.init(31, 39, txt)

    def green(self, txt: str) -> str:
        return self.init(32, 39, txt)

    def yellow(self, txt: str) -> str:
        return self.init(33, 39, txt)

    def blue(self, txt: str) -> str:
        return self.init(34, 39, txt)

    def magenta(self, txt: str) -> str:
        return self.init(35, 39, txt)

    def cyan(self, txt: str) -> str:
        return self.init(36, 39, txt)

    def white(self, txt: str) -> str:
        return self.init(37, 39, txt)

    def gray(self, txt: str) -> str:
        return self.init(90, 39, txt)

    def grey(self, txt: str) -> str:
        return self.init(90, 39, txt)

class Logs:
    def __init__(self):
        self.path = os.getcwd()
        self.colors = Colors()

    def setup(self, config: dict) -> None:
        if isinstance(config.get('pathfile'), str):
            pathfile = os.path.join(self.path, config['pathfile'])
            if not os.path.exists(pathfile):
                os.makedirs(pathfile, exist_ok=True)
            self.pf = config['pathfile']

        if isinstance(config.get('formatfilename'), str):
            self.fn = config['formatfilename']

        if isinstance(config.get('prefixlog'), str):
            self.pl = config['prefixlog']

    def gt(self, l: int) -> dict:
        return {
            5: {'type': 'CRITICAL', 'color': self.colors.red},
            4: {'type': 'ERROR', 'color': self.colors.red},
            3: {'type': 'WARNING', 'color': self.colors.yellow},
            2: {'type': 'INFO', 'color': self.colors.green},
            1: {'type': 'DEBUG', 'color': self.colors.white}
        }.get(l)

    def dt(self, t: str)  -> str:
        formatted_parts = datetime.now().strftime('%A %Y %m %d %H %M').split()
        token_replacements = [formatted_parts[4], formatted_parts[5], formatted_parts[2], formatted_parts[3], formatted_parts[1]]
        for token, replacement in zip(["%H", "%M", "%j", "%m", "%a"], token_replacements):
            t = t.replace(token, replacement)
        return t

    def s(self, t: str) -> None:
        file = self.path
        if hasattr(self, 'pf'):
            file = os.path.join(file, self.pf)
        if hasattr(self, 'fn'):
            file = os.path.join(file, self.dt(self.fn))
        else:
            file = os.path.join(file, 'Logs.txt')

        with open(file, 'a', encoding='utf-8') as f:
            f.write(t + '\n')

    def p(self, l: int, t: str) -> None:
        level = self.gt(l)
        if level:
            txt = self.pl and self.dt("{}{}".format(self.pl, t)) or t
            if l > 1:
                self.s(txt.replace("%type", level['type']))
            print(txt.replace('%type', level['color'](level['type'])))

    def debug(self, *text: str, separator: str = " ") -> None:
        self.p(1, separator.join(text))

    def info(self, *text: str, separator: str = " ") -> None:
        self.p(2, separator.join(text))

    def warning(self, *text: str, separator: str = " ") -> None:
        self.p(3, separator.join(text))

    def error(self, *text: str, separator: str = " ") -> None:
        self.p(4, separator.join(text))

    def critical(self, *text: str, separator: str = " ") -> None:
        self.p(5, separator.join(text))

