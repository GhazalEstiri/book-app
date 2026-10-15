function Navbar() {
  return (
    <div className="navbar bg-[#e8e8e893] shadow-sm fixed ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Novella</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-5">
          <li className="bg-[#6542B5] rounded-xl text-white">
            <a>Link</a>
          </li>
          <li>
            <details>
              <summary  className="bg-[#6542B5] rounded-xl text-white">Parent</summary>
              <ul className="rounded-t-none p-2 bg-[#6542B5] rounded-xl text-white">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
