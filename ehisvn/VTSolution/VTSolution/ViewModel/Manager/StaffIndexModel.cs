﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VTSolution.ViewModel.Manager
{
    public class StaffIndexModel
    {
        [HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Name { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Email { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Vi_Position { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string GroupName { get; set; }
        [HiddenInput(DisplayValue = false)]
        public int? GroupId { get; set; }
        public int OrderBy { get; set; }
    }
}